import {Component, OnInit} from '@angular/core';
import {UserLoginCmdDto} from '../../../shared/models/users/UserLoginCmdDto';
import {Store} from '@ngrx/store';
import {authenticate} from '../../../core/actions/user.actions';
import {AppState} from '../../../core/states/app.state';
import {Payload} from '../../../shared/redux/Payload';
import {selectConnectedUser} from '../../../core/selectors/user.selectors';
import {UserLogin} from '../../../shared/models/users/UserLogin';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: []
})
export class LoginPageComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(selectConnectedUser).subscribe(connectedUser => {
      console.log(connectedUser);
    });
  }

  logUser(user: UserLogin): void {
    this.store.dispatch(authenticate(new Payload<UserLoginCmdDto>(new UserLoginCmdDto(user))));
  }
}
