import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {iif, Observable} from 'rxjs';
import {filter, map, take, takeLast, takeUntil} from 'rxjs/operators';
import {selectConnectedUser} from '../state/user/user.selectors';
import {State} from '../state/state';
import {authenticateRememberedUser} from '../state/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<State>, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.store.select(selectConnectedUser).pipe(
      filter(user => user !== undefined),
      map(user => {
          if (user) {
            return true;
          }
          this.router.navigateByUrl('/login');
          return false;
        }
      ));
  }

}
