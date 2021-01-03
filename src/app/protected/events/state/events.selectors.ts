import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromEvents from './events.reducer';
import * as EventsActions from './events.actions';
import {PaginationWrapper} from '../../../shared/http/pagination/pagination-wrapper';
import {ImageDetailedEventDto} from '../../../shared/models/events/image-detailed-event.dto';

export const selectEventsState = createFeatureSelector<fromEvents.State>(
  fromEvents.eventsFeatureKey
);

export const selectFilter = createSelector(
  selectEventsState,
  state => state.filter
);

export const selectPaginationResume = createSelector(
  selectEventsState,
  state => state.paginationResume
);

export const selectPaginationWithFilter = createSelector(
  selectPaginationResume,
  selectFilter,
  (pagination, filter) => new PaginationWrapper({page: pagination?.page, size: pagination?.size, content: filter})
);
const selectAll = createSelector(
  selectEventsState,
  fromEvents.selectAll
);
export const selectEvents = createSelector(
  selectAll,
  selectEventsState,
  (events, state) => {
    if (state.loaded){
      return events?.map(e => new ImageDetailedEventDto(e));
    }
  }
);



export const selectEvent = createSelector(
  selectEventsState,
  fromEvents.selectAll
);

export const isEventCreated = createSelector(
  selectEventsState,
  s => s.logs?.message === EventsActions.createEventSuccess.type
);

export const selectIsLoading = createSelector(
  selectEventsState,
  s => s.logs.type === 'LOAD'
);
