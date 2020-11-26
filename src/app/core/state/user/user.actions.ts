import {UserRegisterCmdDto} from '../../../shared/models/users/user-register-cmd.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {createAction, props} from '@ngrx/store';
import {Payload} from '../../../shared/redux/payload';
import {UserLogin} from '../../../shared/models/users/user-login';
import {ConnectedUser} from '../../../shared/models/users/connected.user';

export enum ActionTypes {
  REGISTER_USER = '[user] Register user',
  ERROR_REGISTER_USER = '[user] Error register user',
  AUTHENTICATE_USER = '[user] Authenticate user',
  AUTHENTICATE_REMEMBERED_USER = '[user] Authenticate remembered user',
  SUCCESS_AUTHENTICATE_REGISTER_USER = '[user] Success authenticate or register user',
  ERROR_AUTHENTICATE_USER = '[user] Error authenticate user',
  LOG_OUT = '[user] Log out user',
}

export const authenticateRememberedUser = createAction(ActionTypes.AUTHENTICATE_REMEMBERED_USER);
export const authenticate = createAction(ActionTypes.AUTHENTICATE_USER, props<Payload<UserLogin>>());
export const logOut = createAction(ActionTypes.LOG_OUT);
export const register = createAction(ActionTypes.REGISTER_USER, props<Payload<UserRegisterCmdDto>>());
export const successAuthenticateRegister = createAction(ActionTypes.SUCCESS_AUTHENTICATE_REGISTER_USER, props<Payload<ConnectedUser>>());
export const errorRegister = createAction(ActionTypes.ERROR_REGISTER_USER, props<Payload<HttpErrorResponse>>());
export const errorAuthenticate = createAction(ActionTypes.ERROR_AUTHENTICATE_USER, props<Payload<HttpErrorResponse>>());

