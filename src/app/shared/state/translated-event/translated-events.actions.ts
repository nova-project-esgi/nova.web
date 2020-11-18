import {createAction, props} from '@ngrx/store';
import {Payload} from '../../redux/payload';
import {TranslatedEventDto} from '../../models/events/translated-event.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslationId} from '../../ids/translation.id';
import {EventsFilterComponent} from '../../../protected/events/events-filter/events-filter.component';
import {TranslatedEventsFilter} from '../../filters/translated-events.filter';

export enum ActionTypes {
  GET_ALL_TRANSLATED_EVENTS = '[translated events] Get all translated events',
  GET_ONE_TRANSLATED_EVENT = '[translated events] Get one event',
  GET_ONE_TRANSLATED_EVENT_SUCCESS = '[translated events] Get one event success',
  GET_ONE_TRANSLATED_EVENT_ERROR = '[translated events] Get one event error',
}

export const getAllTranslatedEvents = createAction(ActionTypes.GET_ALL_TRANSLATED_EVENTS, props<Payload<TranslatedEventsFilter>>());
export const getOneTranslatedEvent = createAction(ActionTypes.GET_ONE_TRANSLATED_EVENT, props<Payload<TranslationId<string>>>());
export const getOneTranslatedEventSuccess = createAction(ActionTypes.GET_ONE_TRANSLATED_EVENT_SUCCESS, props<Payload<TranslatedEventDto>>());
export const getOneTranslatedEventError = createAction(ActionTypes.GET_ONE_TRANSLATED_EVENT_ERROR, props<Payload<HttpErrorResponse>>());
