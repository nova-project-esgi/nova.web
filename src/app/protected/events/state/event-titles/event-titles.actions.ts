import {createAction, props} from '@ngrx/store';
import {Payload} from '../../../../shared/redux/payload';
import {TranslatedEventsTitleFilter} from '../../../../shared/filters/events/translated-events-title.filter';
import {EventTranslationTitleDto} from '../../../../shared/models/events/event-translation-title.dto';
import {HttpErrorResponse} from '@angular/common/http';

export enum ActionTypes {
  GET_ALL_EVENT_TITLES_FILTERED = '[eventTitle] Get all event titles filtered',
  SUCCESS_GET_ALL_EVENT_TITLES_FILTERED = '[eventTitle] Success get all event titles filtered',
  ERROR_GET_ALL_EVENT_TITLES_FILTERED = '[eventTitle] Error get all event titles filtered',
  SET_EVENT_TITLES_FILTER = '[eventTitle] Set titles filter',
}

export const getAllEventTitlesFiltered = createAction(ActionTypes.GET_ALL_EVENT_TITLES_FILTERED);
export const successGetAllEventTitlesFiltered = createAction(ActionTypes.SUCCESS_GET_ALL_EVENT_TITLES_FILTERED, props<Payload<EventTranslationTitleDto[]>>());
export const errorGetAllEventTitlesFiltered = createAction(ActionTypes.ERROR_GET_ALL_EVENT_TITLES_FILTERED, props<Payload<HttpErrorResponse>>());
export const setEventTitlesFilter = createAction(ActionTypes.SET_EVENT_TITLES_FILTER, props<Payload<TranslatedEventsTitleFilter>>());

