import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRegisterCmdDto} from '../../../shared/models/users/user-register-cmd.dto';
import {eqValidator} from '../../../shared/validators/object.validators';
import {CustomValidators} from 'ngx-custom-validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styles: []
})
export class RegisterFormComponent implements OnInit {

  userForm: FormGroup;
  passwordForm: FormGroup;

  usernameCtrl: FormControl;
  emailCtrl: FormControl;
  pwdCtrl: FormControl;
  confirmPwdCtrl: FormControl;

  user: UserRegisterCmdDto = new UserRegisterCmdDto();

  @Output() validUserChange = new EventEmitter<UserRegisterCmdDto>();

  constructor(private fb: FormBuilder) {
  }

  get isFormValid(): boolean {
    return this.userForm.valid;
  }

  ngOnInit(): void {
    this.usernameCtrl = this.fb.control(this.user?.username,
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
    this.emailCtrl = this.fb.control(this.user?.email,
      [Validators.required, Validators.email]);
    this.pwdCtrl = this.fb.control('',
      [Validators.required, Validators.minLength(8)]);
    this.confirmPwdCtrl = this.fb.control('',
      [Validators.required, eqValidator(this.pwdCtrl)]);

    this.passwordForm = this.fb.group(
      {password: this.pwdCtrl, confirm: this.confirmPwdCtrl},
      {validators: CustomValidators.equalTo}
    );
    this.userForm = this.fb.group({
        username: this.usernameCtrl,
        email: this.emailCtrl,
        passwordForm: this.passwordForm
      }
    );
  }

  onSubmitUser(): void {
    this.user.email = this.emailCtrl.value;
    this.user.username = this.usernameCtrl.value;
    this.user.password = this.pwdCtrl.value;
    this.validUserChange.emit(this.user);
  }

  reset(): void {
    this.userForm.reset({
      username: this.user.username,
      email: this.user.email
    });
    this.passwordForm.reset({
      password: '',
      confirm: ''
    });
  }

}
