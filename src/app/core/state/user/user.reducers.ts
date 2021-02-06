import {User} from '../../../shared/models/users/user';
import * as UserActions from './user.actions';
import {Action, createReducer, on} from '@ngrx/store';
import {LoadableLogState} from '../../../shared/redux/states/loadable-log.state';

export class State extends LoadableLogState {
  connectedUser?: User;

  constructor(state?: Partial<State>) {
    super(state);
  }
}
export const userFeatureKey = 'user';

export const initialState: State = new State({connectedUser: undefined});

const userReducer = createReducer(initialState,
  on(UserActions.logOut, (s: State) => ({...s, connectedUser: null})),
  on(UserActions.authenticateRememberedUser, (s: State, a) => ({...s, loading: true})),
  on(UserActions.authenticate, (s: State, a) => ({...s, loading: true})),
  on(UserActions.register, (s: State, a) => ({...s, sentUser: a.payload, loading: true})),
  on(UserActions.successAuthenticateRegister, (s: State, a) => {
    const user = new User(a.payload);
    return {
      ...s,
      connectedUser: user,
      loading: false,
      loaded: true,
    };
  }),
  on(UserActions.errorRegister, (s: State, a) => ({
    ...s,
    connectedUser: null,
    logs: {type: 'ERROR', message: a.payload.message},
    loading: false
  })),
  on(UserActions.errorAuthenticate, (s: State, a) => ({
    ...s,
    connectedUser: null,
    logs: {type: 'ERROR', message: a.payload.message},
    loading: false
  })),
);

export function reducer(state: State | undefined, action: Action): State {
  return userReducer(state, action);
}

