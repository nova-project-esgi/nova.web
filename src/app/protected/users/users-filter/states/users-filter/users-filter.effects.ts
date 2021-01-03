import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, withLatestFrom, switchMap} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as UsersFilterActions from './users-filter.actions';
import * as UsersFilterSelectors from './users-filter.selectors';
import * as fromUsersFilter from './users-filter.reducer';
import * as EventsFilterActions from '../../../../events/events-filter/state/events-filter.actions';
import * as EventsFilterSelectors from '../../../../events/events-filter/state/events-filter.selectors';
import {Payload} from '../../../../../shared/redux/payload';
import {EventTranslationTitleDto} from '../../../../../shared/models/events/event-translation-title.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {UserService} from '../../../../../core/services/http/user.service';
import {UserUsernameDto} from '../../../../../shared/models/users/user-username.dto';
import * as ResourcesActions from '../../../../resources/state/resources.actions';
import * as ResourcesSelectors from '../../../../resources/state/resources.selectors';
import {PaginationMetadata} from '../../../../../shared/http/pagination/pagination-metadata';
import {ImageDetailedResourceDto} from '../../../../../shared/models/resources/image-detailed-resource.dto';


@Injectable()
export class UsersFilterEffects {

  loadUsernames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersFilterActions.loadUsernames),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(UsersFilterSelectors.selectFilter))
      )),
      switchMap(([action, filter]) => this.userService.getPaginatedUsernamesFiltered(filter).pipe(
        map(usernames => UsersFilterActions.loadUsernamesSuccess(new Payload<UserUsernameDto[]>(usernames))),
        catchError(err => of(UsersFilterActions.loadUsernamesFailure(new Payload<HttpErrorResponse>(err))))
      )),
    );
  });


  constructor(private actions$: Actions, private store: Store<fromUsersFilter.State>, private userService: UserService) {}

}
