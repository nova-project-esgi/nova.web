import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {UserRegisterCmdDto} from '../../../shared/models/users/UserRegisterCmdDto';
import {CustomValidators} from 'ngx-custom-validators';
import {eqValidator} from '../../../shared/validators/object.validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent implements OnInit {


  ngOnInit(): void {
  }


  createUser(user: UserRegisterCmdDto): void {

  }
}
