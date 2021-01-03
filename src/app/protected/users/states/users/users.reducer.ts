import { Action, createReducer, on } from '@ngrx/store';
import {LoadableLogEntityState} from '../../../../shared/redux/states/loadable-log-entity.state';
import {PaginationResume} from '../../../../shared/http/pagination/pagination-resume';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import * as UsersActions from './users.actions';
import {LoadableLogState} from '../../../../shared/redux/states/loadable-log.state';
import {UserAdminEditDto} from '../../../../shared/models/users/user-admin-edit.dto';
import {UsersFilter} from '../../../../shared/filters/users/users-filter';
import {PaginationLogEntityState} from '../../../../shared/redux/states/pagination-log-entity.state';

export const usersFeatureKey = 'users';

export class State extends LoadableLogEntityState<UserAdminEditDto> {
  filter: UsersFilter;
  paginationResume: PaginationResume;
}

const adapter: EntityAdapter<UserAdminEditDto> = createEntityAdapter<UserAdminEditDto>();
export const initialState: State = adapter.getInitialState(new State());

export const reducer = createReducer<State>(
  initialState,
  on(UsersActions.updateFilter, (state, a) => ({...state, filter: a.payload})),
  on(UsersActions.updatePagination, (state, a) => ({...state, paginationResume: a.payload})),
  on(UsersActions.loadUsersPageFiltered, state => LoadableLogEntityState.toLoadState(state, UsersActions.loadUsersPageFiltered)),
  on(UsersActions.loadUsersPageFilteredSuccess, (state, action) =>     PaginationLogEntityState.onLoadPageSuccess(adapter, state, action)
  ),
  on(UsersActions.loadUsersPageFilteredFailure, (state, action) => LoadableLogEntityState.toLoadFailureState(state, action)),
  on(UsersActions.updateUser, state =>
    LoadableLogState.toLoadState(state, UsersActions.updateUser)),
  on(UsersActions.updateUserSuccess, (state, a) =>
    adapter.updateOne({id: a.payload.id, changes: a.payload}, LoadableLogEntityState.toLoadSuccessState(state, a))),
  on(UsersActions.updateUserFailure, (state, action) =>
    LoadableLogState.toLoadFailureState(state, action))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();


