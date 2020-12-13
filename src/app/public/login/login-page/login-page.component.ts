import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {authenticate} from '../../../core/state/user/user.actions';
import {State} from '../../../core/state/state';
import {Payload} from '../../../shared/redux/payload';
import {selectConnectedUser} from '../../../core/state/user/user.selectors';
import {UserLogin} from '../../../shared/models/users/user-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: []
})
export class LoginPageComponent implements OnInit {

  constructor(private store: Store<State>, private router: Router) {
  }

  ngOnInit(): void {
    this.store.select(selectConnectedUser).subscribe(connectedUser => {
      if (connectedUser) {
        this.router.navigate(['home']);
      }
    });
  }

  logUser(user: UserLogin): void {
    this.store.dispatch(authenticate(new Payload<UserLogin>(user)));

  }
}
