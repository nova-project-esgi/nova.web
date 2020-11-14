import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectConnectedUser} from '../selectors/user.selectors';
import {AppState} from '../states/app.state';
import {mergeMap, switchMap, take} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectConnectedUser).pipe(
      take(1),
      switchMap((user) => {
        if (user){
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.jwt.token}`
            }
          });
        }
        return next.handle(req);
      }));
  }
}
