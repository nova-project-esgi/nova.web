import {createReducer, on} from '@ngrx/store';
import * as EventsActions from './events.actions';
import {LoadableLogEntityState} from '../../../shared/redux/states/loadable-log-entity.state';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {TranslatedEventsFilter} from '../../../shared/filters/events/translated-events.filter';
import {PaginationResume} from '../../../shared/http/pagination/pagination-resume';
import {LoadableLogState} from '../../../shared/redux/states/loadable-log.state';
import {ImageDetailedEventDto} from '../../../shared/models/events/image-detailed-event.dto';
import {PaginationLogEntityState} from '../../../shared/redux/states/pagination-log-entity.state';

export const eventsFeatureKey = 'events';

export class State extends LoadableLogEntityState<ImageDetailedEventDto> {
  filter: TranslatedEventsFilter;
  paginationResume: PaginationResume;
}

const adapter: EntityAdapter<ImageDetailedEventDto> = createEntityAdapter<ImageDetailedEventDto>();
export const initialState: State = adapter.getInitialState(new State());

export const reducer = createReducer<State>(
  initialState,
  on(EventsActions.createEvent, state =>
    LoadableLogState.toLoadState(state, EventsActions.createEvent)),
  on(EventsActions.createEventSuccess, (state) =>
    LoadableLogEntityState.toLoadSuccessState(state, EventsActions.createEventSuccess)),
  on(EventsActions.createEventFailure, (state, action) =>
    LoadableLogState.toLoadFailureState(state, action)),
  on(EventsActions.updateFilter, (state, a) => ({...state, filter: a.payload})),
  on(EventsActions.updatePagination, (state, a) => ({...state, paginationResume: a.payload})),
  on(EventsActions.loadEventsPageFiltered, state => LoadableLogEntityState.toLoadState(state, EventsActions.loadEventsPageFiltered)),
  on(EventsActions.loadEventsPageFilteredSuccess, (state, action) => PaginationLogEntityState.onLoadPageSuccess(adapter, state, action)
  ),
  on(EventsActions.loadEventsPageFilteredFailure, (state, action) => LoadableLogEntityState.toLoadFailureState(state, action)),
  on(EventsActions.updateEvent, state =>
    LoadableLogState.toLoadState(state, EventsActions.updateEvent)),
  on(EventsActions.updateEventSuccess, (state, a) =>
    adapter.updateOne({id: a.payload.id, changes: a.payload}, LoadableLogEntityState.toLoadSuccessState(state, a))),
  on(EventsActions.updateEventFailure, (state, action) =>
    LoadableLogState.toLoadFailureState(state, action)),
  on(EventsActions.deleteEvent, state => LoadableLogState.toLoadState(state, EventsActions.deleteEvent)),
  on(EventsActions.deleteEventSuccess, (state, action) => {
    return adapter.removeOne(action.payload, LoadableLogEntityState.toLoadSuccessState({...state}, EventsActions.deleteEventSuccess));
  }),
  on(EventsActions.deleteEventFailure, (state, action) => LoadableLogState.toLoadFailureState(state, action)),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

