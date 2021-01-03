import {createAction, props} from '@ngrx/store';
import {Payload} from '../../../../shared/redux/payload';
import {EventTranslationDto} from '../../../../shared/models/events/event-translation.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {EventTranslationFilter} from '../../../../shared/filters/events/event-translation.filter';
import {EventTranslationCreationDto} from '../../../../shared/models/events/event-translation-creation.dto';

export const createNewTranslation = createAction(
  '[EventsTranslation] Create new EventsTranslations',
  props<Payload<EventTranslationCreationDto>>()
);
export const createNewTranslationSuccess = createAction(
  '[EventsTranslation] Create new EventsTranslations Success',
  props<Payload<EventTranslationDto>>()
);
export const createNewTranslationFailure = createAction(
  '[EventsTranslation] Create new EventsTranslations Failure',
  props<Payload<HttpErrorResponse>>()
);

export const loadEventsTranslationsByIds = createAction(
  '[EventsTranslation] Load EventsTranslations by ids',
  props<Payload<EventTranslationFilter>>()
);

export const loadEventsTranslationsByIdsSuccess = createAction(
  '[EventsTranslation] Load EventsTranslations  by ids Success',
  props<Payload<EventTranslationDto[]>>()
);

export const loadEventsTranslationsByIdsFailure = createAction(
  '[EventsTranslation] Load EventsTranslations  by ids Failure',
  props<Payload<HttpErrorResponse>>()
);
