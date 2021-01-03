import {createReducer, on} from '@ngrx/store';
import * as UsersFilterActions from './users-filter.actions';
import {LoadableLogState} from '../../../../../shared/redux/states/loadable-log.state';
import {UserUsernameDto} from '../../../../../shared/models/users/user-username.dto';
import {UsersFilter} from '../../../../../shared/filters/users/users-filter';

export const usersFilterFeatureKey = 'usersFilter';

export class State extends LoadableLogState {
  filter: UsersFilter = new UsersFilter();
  usernames: UserUsernameDto[] = [];
}

export const initialState: State = new State();


export const reducer = createReducer(
  initialState,
  on(UsersFilterActions.loadUsernames, state => LoadableLogState.toLoadState(state, UsersFilterActions.loadUsernames)),
  on(UsersFilterActions.updateFilter, (state, a) =>
    ({...state, filter: a.payload})),
  on(UsersFilterActions.loadUsernamesSuccess, (state, action) => {
    return {...LoadableLogState.toLoadSuccessState(state, UsersFilterActions.loadUsernamesSuccess), usernames: action.payload};
  }),
  on(UsersFilterActions.loadUsernamesFailure, (state, action) => LoadableLogState.toLoadFailureState(state, action)),
);
