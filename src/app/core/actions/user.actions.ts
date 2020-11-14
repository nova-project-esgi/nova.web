import {UserRegisterCmdDto} from '../../shared/models/users/UserRegisterCmdDto';
import {JWT} from '../../shared/models/JWT';
import {HttpErrorResponse} from '@angular/common/http';
import {createAction, props} from '@ngrx/store';
import {UserLoginCmdDto} from '../../shared/models/users/UserLoginCmdDto';
import {Payload} from '../../shared/redux/Payload';
import {UserLogin} from '../../shared/models/users/UserLogin';
import {UserResumeDto} from '../../shared/models/users/UserResumeDto';

export enum ActionTypes {
  SELECT_USER = '[user] Select user',
  REGISTER_USER = '[user] Register user',
  ERROR_REGISTER_USER = '[user] Error register user',
  AUTHENTICATE_USER = '[user] Authenticate user',
  REMEMBER_USER = '[user] Remember user',
  SUCCESS_AUTHENTICATE_REGISTER_USER = '[user] Success authenticate or register user',
  ERROR_AUTHENTICATE_USER = '[user] Error authenticate user',
}
export const authenticate = createAction(ActionTypes.AUTHENTICATE_USER, props<Payload<UserLoginCmdDto>>());
export const remember = createAction(ActionTypes.REMEMBER_USER, props<Payload<boolean
>>());
export const register = createAction(ActionTypes.REGISTER_USER, props<Payload<UserRegisterCmdDto>>());
export const successAuthenticateRegister = createAction(ActionTypes.SUCCESS_AUTHENTICATE_REGISTER_USER, props<Payload<UserResumeDto>>());
export const errorRegister = createAction(ActionTypes.ERROR_REGISTER_USER, props<Payload<HttpErrorResponse>>());
export const errorAuthenticate = createAction(ActionTypes.ERROR_AUTHENTICATE_USER, props<Payload<HttpErrorResponse>>());

