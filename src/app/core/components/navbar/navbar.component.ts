import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectConnectedUser} from '../../state/user/user.selectors';
import {User} from '../../../shared/models/users/user';
import {logOut} from '../../state/user/user.actions';
import {Router} from '@angular/router';
import {DimensionsDirective} from '../../../shared/directives/dimensions.directive';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  user?: User;


  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.store.select(selectConnectedUser).subscribe(user => this.user = user);
  }

  logOut(): void {
    this.store.dispatch(logOut());
    this.router.navigate(['home']);
  }
}
