import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectConnectedUser} from '../../selectors/user.selectors';
import {User} from '../../../shared/models/users/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  user?: User;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectConnectedUser).subscribe(user => this.user = user);
  }

}
