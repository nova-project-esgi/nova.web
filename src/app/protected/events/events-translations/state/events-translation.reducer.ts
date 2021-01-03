import {createReducer, on} from '@ngrx/store';
import * as EventsTranslationActions from './events-translation.actions';
import {LoadableLogEntityState} from '../../../../shared/redux/states/loadable-log-entity.state';
import {EventTranslationDto} from '../../../../shared/models/events/event-translation.dto';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

export const eventsTranslationFeatureKey = 'eventsTranslation';

export class State extends LoadableLogEntityState<EventTranslationDto> {

}

const adapter: EntityAdapter<EventTranslationDto> = createEntityAdapter<EventTranslationDto>();
export const initialState: State = adapter.getInitialState(new State());

export const reducer = createReducer<State>(
  initialState,
  on(EventsTranslationActions.createNewTranslation, state => LoadableLogEntityState.toLoadState(state, EventsTranslationActions.createNewTranslation)),
  on(EventsTranslationActions.createNewTranslationSuccess, (state, action) => {
    return adapter.addOne(action.payload, LoadableLogEntityState.toLoadSuccessState({...state}, EventsTranslationActions.createNewTranslationSuccess));
  }),
  on(EventsTranslationActions.createNewTranslationFailure, (state, action) => LoadableLogEntityState.toLoadFailureState(state, action)),
  on(EventsTranslationActions.loadEventsTranslationsByIds, state => state),
  on(EventsTranslationActions.loadEventsTranslationsByIdsSuccess, (state, action) => {
    return adapter.addMany(action.payload, LoadableLogEntityState.toLoadSuccessState({...state}, EventsTranslationActions.loadEventsTranslationsByIdsSuccess));
  }),
  on(EventsTranslationActions.loadEventsTranslationsByIdsFailure, (state, action) => LoadableLogEntityState.toLoadFailureState(state, action)),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();



