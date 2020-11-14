import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRegisterCmdDto} from '../../../shared/models/users/UserRegisterCmdDto';
import {UserLoginCmdDto} from '../../../shared/models/users/UserLoginCmdDto';
import {UserLogin} from '../../../shared/models/users/UserLogin';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [
  ]
})
export class LoginFormComponent implements OnInit {
  userLoginForm: FormGroup;
  usernameCtrl: FormControl;
  userPwdCtrl: FormControl;
  rememberMeCtrl: FormControl;

  @Output() validUserChange = new EventEmitter<UserLogin>();
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.usernameCtrl = this.formBuilder.control('', Validators.required);
    this.userPwdCtrl = this.formBuilder.control('', Validators.required);
    this.rememberMeCtrl = this.formBuilder.control(false);
    this.userLoginForm = this.formBuilder.group({
        username: this.usernameCtrl,
        password: this.userPwdCtrl,
        rememberMe: this.rememberMeCtrl
      }
    );
  }

  isFormValid(): boolean {
    return this.userLoginForm.valid;
  }

  attemptLogin(): void {
    this.validUserChange.emit(new UserLogin({
      username: this.usernameCtrl.value,
      password: this.userPwdCtrl.value,
      rememberMe: this.rememberMeCtrl.value
    }));
  }
}
