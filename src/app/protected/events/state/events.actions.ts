import {createAction, props} from '@ngrx/store';
import {TranslatedEventsFilter} from '../../../shared/filters/events/translated-events.filter';
import {Payload} from '../../../shared/redux/payload';
import {HttpErrorResponse} from '@angular/common/http';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {PaginationResume} from '../../../shared/http/pagination/pagination-resume';
import {ImageDetailedEventEdition} from '../../../shared/models/events/image-detailed-event-edition';
import {ImageDetailedEventDto} from '../../../shared/models/events/image-detailed-event.dto';


export const updateFilter = createAction(
  '[Events] Update filter',
  props<Payload<TranslatedEventsFilter>>()
);

export const updatePagination = createAction(
  '[Events] Update pagination',
  props<Payload<PaginationResume>>()
);

export const createEvent = createAction(
  '[Events] Create Event',
  props<Payload<ImageDetailedEventEdition>>()
);
export const createEventSuccess = createAction(
  '[Events] Create Event Success'
);
export const createEventFailure = createAction(
  '[Events] Create Event Failure',
  props<Payload<HttpErrorResponse>>()
);


export const nextPage = createAction(
  '[Events] Next page'
);
export const previousPage = createAction(
  '[Events] Previous page'
);
export const updatePageSize = createAction(
  '[Events] Update page size', props<Payload<number>>()
);
export const loadEventsPageFiltered = createAction(
  '[Events] Load events page'
);
export const loadEventsPageFilteredSuccess = createAction(
  '[Events] Load events page filtered Success',
  props<Payload<PaginationMetadata<ImageDetailedEventDto>>>()
);

export const loadEventsPageFilteredFailure = createAction(
  '[Events] Load events page filtered  Failure',
  props<Payload<HttpErrorResponse>>()
);


export const deleteEvent = createAction(
  '[Events] Delete Event',
  props<Payload<string>>()
);
export const deleteEventSuccess = createAction(
  '[Events] Delete Event Success',
  props<Payload<string>>()
);
export const deleteEventFailure = createAction(
  '[Events] Delete Event Failure',
  props<Payload<HttpErrorResponse>>()
);

export const updateEvent = createAction(
  '[Events] Update Event',
  props<Payload<ImageDetailedEventEdition>>()
);
export const updateEventSuccess = createAction(
  '[Events] Update Event Success',
  props<Payload<ImageDetailedEventDto>>()
);
export const updateEventFailure = createAction(
  '[Events] Update Event Failure',
  props<Payload<HttpErrorResponse>>()
);
