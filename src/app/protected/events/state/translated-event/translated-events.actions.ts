import {createAction, props} from '@ngrx/store';
import {Payload} from '../../../../shared/redux/payload';
import {TranslatedEventDto} from '../../../../shared/models/events/translated-event.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslationId} from '../../../../shared/ids/translation.id';
import {TranslatedEventsTitleFilter} from '../../../../shared/filters/events/translated-events-title.filter';
import {TranslatedEventsFilter} from '../../../../shared/filters/events/translated-events.filter';
import {PaginationMetadata} from '../../../../shared/http/pagination/pagination-metadata';
import {PaginationWrapper} from '../../../../shared/http/pagination/pagination-wrapper';

export enum ActionTypes {
  GET_ALL_TRANSLATED_EVENTS = '[translated events] Get all translated events',
  GET_ONE_TRANSLATED_EVENT = '[translated events] Get one event',
  GET_ONE_TRANSLATED_EVENT_SUCCESS = '[translated events] Get one event success',
  GET_ONE_TRANSLATED_EVENT_ERROR = '[translated events] Get one event error',
  GET_PAGINATED_TRANSLATED_EVENTS_FILTERED = '[translated events] Get paginated translated events filtered ',
  GET_PAGINATED_TRANSLATED_EVENTS_FILTERED_SUCCESS = '[translated events] Get paginated translated events filtered success ',
  GET_PAGINATED_TRANSLATED_EVENTS_FILTERED_ERROR = '[translated events] Get paginated translated events filtered error',
  SET_EVENTS_FILTER = '[translated events] Set event filter'

}

export const getAllTranslatedEvents = createAction(ActionTypes.GET_ALL_TRANSLATED_EVENTS, props<Payload<TranslatedEventsTitleFilter>>());
export const getOneTranslatedEvent = createAction(ActionTypes.GET_ONE_TRANSLATED_EVENT, props<Payload<TranslationId<string>>>());
export const getOneTranslatedEventSuccess = createAction(ActionTypes.GET_ONE_TRANSLATED_EVENT_SUCCESS, props<Payload<TranslatedEventDto>>());
export const getOneTranslatedEventError = createAction(ActionTypes.GET_ONE_TRANSLATED_EVENT_ERROR, props<Payload<HttpErrorResponse>>());
export const getPaginatedTranslatedEventsFiltered = createAction(ActionTypes.GET_PAGINATED_TRANSLATED_EVENTS_FILTERED);
export const getPaginatedTranslatedEventsFilteredSuccess = createAction(ActionTypes.GET_PAGINATED_TRANSLATED_EVENTS_FILTERED_SUCCESS, props<Payload<PaginationMetadata<TranslatedEventDto>>>());
export const getPaginatedTranslatedEventsFilteredError = createAction(ActionTypes.GET_PAGINATED_TRANSLATED_EVENTS_FILTERED_ERROR, props<Payload<HttpErrorResponse>>());
export const setEventsFilter = createAction(ActionTypes.SET_EVENTS_FILTER, props<Payload<TranslatedEventsFilter>>());
