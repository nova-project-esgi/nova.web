import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {TranslatedEventDto} from '../../../../shared/models/events/translated-event.dto';
import {
  getAllTranslatedEvents,
  getOneTranslatedEvent,
  getOneTranslatedEventError,
  getOneTranslatedEventSuccess,
  getPaginatedTranslatedEventsFiltered,
  getPaginatedTranslatedEventsFilteredError,
  getPaginatedTranslatedEventsFilteredSuccess,
  setEventsFilter
} from './translated-events.actions';
import {LoadableLogEntityState} from '../../../../shared/redux/states/loadable-log-entity.state';
import {TranslatedEventsFilter} from '../../../../shared/filters/events/translated-events.filter';
import {PaginationResume} from '../../../../shared/http/pagination/pagination-resume';


const adapter: EntityAdapter<TranslatedEventDto> = createEntityAdapter<TranslatedEventDto>();

export class TranslatedEventsState extends LoadableLogEntityState<TranslatedEventDto> {
  filter: TranslatedEventsFilter = new TranslatedEventsFilter();
  paginationResume: PaginationResume;
}

export const initialState: TranslatedEventsState = adapter
  .getInitialState(new TranslatedEventsState());

const translatedEventsReducers = createReducer(initialState,
  on(getAllTranslatedEvents, (s: TranslatedEventsState) => ({...s, loading: true, loaded: false})),
  on(getOneTranslatedEvent, (s: TranslatedEventsState) => ({...s, loading: true, loaded: false})),
  on(getOneTranslatedEventSuccess, (s: TranslatedEventsState, a) => {
    return adapter.addOne(a.payload, {...s, loaded: true, loading: false, selectedId: a.payload.id});
  }),
  on(getOneTranslatedEventError, (s: TranslatedEventsState, a) => {
    return {...s, loaded: true, loading: false, logs: {type: 'ERROR', message: a?.payload?.message}};
  }),
  on(setEventsFilter, (s: TranslatedEventsState, a) => ({...s, filter: a.payload})),
  on(getPaginatedTranslatedEventsFiltered, (s: TranslatedEventsState, a) => ({...s, loading: true, loaded: false})),
  on(getPaginatedTranslatedEventsFilteredSuccess, (s: TranslatedEventsState, a) => {
    return adapter.addMany(a.payload.values, {...s, loaded: true, loading: false, paginationResume: new PaginationResume(a.payload)});
  }),
  on(getPaginatedTranslatedEventsFilteredError, (s: TranslatedEventsState, a) => {
    return {...s, loaded: true, loading: false, logs: {type: 'ERROR', message: a?.payload?.message}};
  }),
);

export function reducer(state: TranslatedEventsState | undefined, action: Action): TranslatedEventsState {
  return translatedEventsReducers(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

