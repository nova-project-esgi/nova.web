import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsersFilter from './users-filter.reducer';
import {UsersFilter} from '../../../../../shared/filters/users/users-filter';
import {UserUsernameDto} from '../../../../../shared/models/users/user-username.dto';

export const selectUsersFilterState = createFeatureSelector<fromUsersFilter.State>(
  fromUsersFilter.usersFilterFeatureKey
);
export const selectFilter = createSelector(
  selectUsersFilterState,
  state => new UsersFilter(state.filter)
);

export const selectUsernames = createSelector(
  selectUsersFilterState,
  state => state.usernames?.map(u => new UserUsernameDto(u)) ?? []
);
