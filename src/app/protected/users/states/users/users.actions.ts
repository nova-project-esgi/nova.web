import {createAction, props} from '@ngrx/store';
import {Payload} from '../../../../shared/redux/payload';
import {PaginationResume} from '../../../../shared/http/pagination/pagination-resume';
import {HttpErrorResponse} from '@angular/common/http';
import {PaginationMetadata} from '../../../../shared/http/pagination/pagination-metadata';
import {UsersFilter} from '../../../../shared/filters/users/users-filter';
import {UserAdminEditDto} from '../../../../shared/models/users/user-admin-edit.dto';

export const updateFilter = createAction(
  '[Users] Update filter',
  props<Payload<UsersFilter>>()
);

export const updatePagination = createAction(
  '[Users] Update pagination',
  props<Payload<PaginationResume>>()
);


export const nextPage = createAction(
  '[Users] Next page'
);
export const previousPage = createAction(
  '[Users] Previous page'
);
export const updatePageSize = createAction(
  '[Users] Update page size', props<Payload<number>>()
);
export const loadUsersPageFiltered = createAction(
  '[Users] Load users page'
);
export const loadUsersPageFilteredSuccess = createAction(
  '[Users] Load users page filtered Success',
  props<Payload<PaginationMetadata<UserAdminEditDto>>>()
);

export const loadUsersPageFilteredFailure = createAction(
  '[Users] Load users page filtered  Failure',
  props<Payload<HttpErrorResponse>>()
);

export const updateUser = createAction(
  '[Users] Update User',
  props<Payload<UserAdminEditDto>>()
);
export const updateUserSuccess = createAction(
  '[Users] Update User Success',
  props<Payload<UserAdminEditDto>>()
);
export const updateUserFailure = createAction(
  '[Users] Update User Failure',
  props<Payload<HttpErrorResponse>>()
);

