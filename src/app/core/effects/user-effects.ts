import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {AuthenticationService} from '../services/http/authentication.service';
import {catchError, concatMap, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as UserActions from '../actions/user.actions';
import {JWT} from '../../shared/models/JWT';
import {HttpErrorResponse} from '@angular/common/http';
import {TypedAction} from '@ngrx/store/src/models';
import {UserRegisterCmdDto} from '../../shared/models/users/UserRegisterCmdDto';
import {UserLoginCmdDto} from '../../shared/models/users/UserLoginCmdDto';
import {Payload} from '../../shared/redux/Payload';
import {UserResumeDto} from '../../shared/models/users/UserResumeDto';

@Injectable()
export class UserEffects {

  constructor(private authenticationService: AuthenticationService, private actions$: Actions) {
  }

  authenticate$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.ActionTypes.AUTHENTICATE_USER),
    switchMap((action: Payload<UserLoginCmdDto> & TypedAction<string>) => this.authenticationService.login(action.payload)),
    map((token: UserResumeDto) => UserActions.successAuthenticateRegister(new Payload(token))),
    catchError((err: HttpErrorResponse) => of(UserActions.errorAuthenticate(new Payload(err))))
  ));

  register$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.ActionTypes.REGISTER_USER),
    switchMap((action: UserRegisterCmdDto & TypedAction<string>) => this.authenticationService.register(action)),
    map((token: UserResumeDto) => UserActions.successAuthenticateRegister(new Payload(token))),
    catchError((err: HttpErrorResponse) => of(UserActions.errorRegister(new Payload(err))))
  ));
}
