import {Component, OnInit} from '@angular/core';
import {UserRegisterCmdDto} from '../../../shared/models/users/user-register-cmd.dto';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: []
})
export class RegisterPageComponent implements OnInit {


  ngOnInit(): void {
  }


  createUser(user: UserRegisterCmdDto): void {

  }
}
