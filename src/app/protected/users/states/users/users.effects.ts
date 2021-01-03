import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, withLatestFrom, switchMap} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as UsersSelectors from './users.selectors';
import * as fromUsers from './users.reducer';
import * as UsersActions from './users.actions';
import * as ResourceSelectors from '../../../../shared/states/resources/resources.selectors';
import {Payload} from '../../../../shared/redux/payload';
import {PaginationMetadata} from '../../../../shared/http/pagination/pagination-metadata';
import {HttpErrorResponse} from '@angular/common/http';
import {UserAdminEditDto} from '../../../../shared/models/users/user-admin-edit.dto';
import {Store} from '@ngrx/store';
import {UserService} from '../../../../core/services/http/user.service';



@Injectable()
export class UsersEffects {

  loadUsersFiltered$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUsersPageFiltered),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(UsersSelectors.selectPaginationWithFilter)),
      )),
      switchMap(([action, paginationWrapper]) => this.userService.getPaginatedUserAdminEditFiltered(paginationWrapper).pipe(
        map(page => UsersActions.loadUsersPageFilteredSuccess(new Payload<PaginationMetadata<UserAdminEditDto>>(page))),
        catchError(err => of(UsersActions.loadUsersPageFilteredFailure(new Payload<HttpErrorResponse>(err))))
      )),
    );
  });

  updateEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.updateUser),
      switchMap((action) => this.userService.update(action.payload, action.payload.id).pipe(
        map(event => UsersActions.updateUserSuccess(new Payload<UserAdminEditDto>(action.payload))),
        catchError(err => of(UsersActions.updateUserFailure(new Payload<HttpErrorResponse>(err))))
      ))
    );
  });


  constructor(private actions$: Actions, private store: Store<fromUsers.State>, private userService: UserService) {}

}
