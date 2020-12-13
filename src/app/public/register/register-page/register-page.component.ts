import {Component, OnInit} from '@angular/core';
import {UserRegisterCmdDto} from '../../../shared/models/users/user-register-cmd.dto';
import {Store} from '@ngrx/store';
import {State} from '../../../core/state/state';
import {Router} from '@angular/router';
import {register} from '../../../core/state/user/user.actions';
import {Payload} from '../../../shared/redux/payload';
import {selectConnectedUser} from '../../../core/state/user/user.selectors';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: []
})
export class RegisterPageComponent implements OnInit {

  constructor(private store: Store<State>, private router: Router) {
  }

  ngOnInit(): void {
    this.store.select(selectConnectedUser).subscribe(connectedUser => {
      if (connectedUser) {
        this.router.navigate(['home']);
      }
    });
  }


  createUser(user: UserRegisterCmdDto): void {
    this.store.dispatch(register(new Payload<UserRegisterCmdDto>(user)));
  }
}
