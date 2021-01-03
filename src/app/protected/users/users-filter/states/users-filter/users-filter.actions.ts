import { createAction, props } from '@ngrx/store';
import {Payload} from '../../../../../shared/redux/payload';
import {TranslatedEventsTitleFilter} from '../../../../../shared/filters/events/translated-events-title.filter';
import {EventTranslationTitleDto} from '../../../../../shared/models/events/event-translation-title.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {UserUsernameDto} from '../../../../../shared/models/users/user-username.dto';
import {UsersFilter} from '../../../../../shared/filters/users/users-filter';


export const updateFilter = createAction(
  '[UsersFilter] Update filter',
  props<Payload<UsersFilter>>()
);

export const loadUsernames = createAction(
  '[UsersFilter] Load usernames'
);

export const loadUsernamesSuccess = createAction(
  '[UsersFilter] Load usernames Success',
  props<Payload<UserUsernameDto[]>>()
);

export const loadUsernamesFailure = createAction(
  '[UsersFilter] Load usernames Failure',
  props<Payload<HttpErrorResponse>>()
);


