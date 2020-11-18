import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {TranslatedEventDto} from '../../models/events/translated-event.dto';
import {LoadableLogEntityState} from '../../states/loadable-log-entity.state';
import {
  getAllTranslatedEvents,
  getOneTranslatedEvent,
  getOneTranslatedEventError,
  getOneTranslatedEventSuccess
} from './translated-events.actions';

const adapter: EntityAdapter<TranslatedEventDto> = createEntityAdapter<TranslatedEventDto>();

export const initialState: LoadableLogEntityState<TranslatedEventDto> = adapter
  .getInitialState(new LoadableLogEntityState<TranslatedEventDto>());

const translatedEventsReducers = createReducer(initialState,
  on(getAllTranslatedEvents, (s: LoadableLogEntityState<TranslatedEventDto>) => ({...s, loading: true, loaded: false})),
  on(getOneTranslatedEvent, (s: LoadableLogEntityState<TranslatedEventDto>) => ({...s, loading: true, loaded: false})),
  on(getOneTranslatedEventSuccess, (s: LoadableLogEntityState<TranslatedEventDto>, a) => {
    return adapter.addOne(a.payload, {...s, loaded: true, loading: false, selectedId: a.payload.id});
  }),
  on(getOneTranslatedEventError, (s: LoadableLogEntityState<TranslatedEventDto>, a) => {
    return {...s, loaded: true, loading: false, logs: {type: 'ERROR', message: a.payload.message}};
  })
);

export function reducer(state: LoadableLogEntityState<TranslatedEventDto> | undefined, action: Action): LoadableLogEntityState<TranslatedEventDto> {
  return translatedEventsReducers(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

