import { createAction, props } from '@ngrx/store';
import {Payload} from '../../../../shared/redux/payload';
import {EventTranslationTitleDto} from '../../../../shared/models/events/event-translation-title.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslatedEventsTitleFilter} from '../../../../shared/filters/events/translated-events-title.filter';


export const updateFilter = createAction(
  '[EventsFilter] Update filter',
  props<Payload<TranslatedEventsTitleFilter>>()
);

export const loadTitles = createAction(
  '[EventsFilter] Load titles'
);

export const loadTitlesSuccess = createAction(
  '[EventsFilter] Load titles Success',
  props<Payload<EventTranslationTitleDto[]>>()
);

export const loadTitlesFailure = createAction(
  '[EventsFilter] Load titles Failure',
  props<Payload<HttpErrorResponse>>()
);


