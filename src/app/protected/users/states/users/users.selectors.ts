import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUsers from './users.reducer';
import * as UsersActions from './users.actions';
import {PaginationWrapper} from '../../../../shared/http/pagination/pagination-wrapper';
import {UserAdminEditDto} from '../../../../shared/models/users/user-admin-edit.dto';


export const selectUsersState = createFeatureSelector<fromUsers.State>(
  fromUsers.usersFeatureKey
);

export const selectFilter = createSelector(
  selectUsersState,
  state => state.filter
);

export const selectPaginationResume = createSelector(
  selectUsersState,
  state => state.paginationResume
);

export const selectPaginationWithFilter = createSelector(
  selectPaginationResume,
  selectFilter,
  (pagination, filter) => new PaginationWrapper({page: pagination?.page, size: pagination?.size, content: filter})
);

const selectAll = createSelector(
  selectUsersState,
  fromUsers.selectAll
);
export const selectUsers = createSelector(
  selectAll,
  selectUsersState,
  (users, state) => {
    if (state.loaded) {
      return users?.map(e => new UserAdminEditDto(e));
    }
  }
);

export const selectUser = createSelector(
  selectUsersState,
  fromUsers.selectAll
);

export const userUpdated = createSelector(
  selectUsersState,
  s => s.logs.message === UsersActions.updateUserSuccess.type
);

