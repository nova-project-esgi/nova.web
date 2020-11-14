import {User} from '../../shared/models/users/User';
import * as UserActions from '../actions/user.actions';
import {Action, createReducer, on} from '@ngrx/store';
import {UserState} from '../states/user.state';

export const initialState: UserState = {
  loading: false,
  loaded: false,
  connectedUser: undefined,
  logs: undefined
};

const userReducer = createReducer(initialState,
  on(UserActions.authenticate, (s: UserState, a) => ({...s, loading: true})),
  on(UserActions.remember, (s: UserState, a) => ({...s})),
  on(UserActions.register, (s: UserState, a) => ({...s, sentUser: a.payload, loading: true})),
  on(UserActions.successAuthenticateRegister, (s: UserState, a) => {
    const user = new User(a.payload);
    return {
      ...s,
      connectedUser: user,
      loading: false,
      loaded: true,
    };
  }),
  on(UserActions.errorRegister, (s: UserState, a) => ({
    ...s,
    logs: {type: 'ERROR', message: a.payload.message},
    loading: false
  })),
  on(UserActions.errorAuthenticate, (s: UserState, a) => ({
    ...s,
    logs: {type: 'ERROR', message: a.payload.message},
    loading: false
  })),
);

export function reducer(state: UserState | undefined, action: Action): UserState {
  return userReducer(state, action);
}

