import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {EventTranslationTitleDto} from '../../../../shared/models/events/event-translation-title.dto';
import * as fromTitles from './event-titles.actions';
import {setEventTitlesFilter} from './event-titles.actions';
import {EventTitleState} from './index';


const adapter: EntityAdapter<EventTranslationTitleDto> = createEntityAdapter<EventTranslationTitleDto>();

export const initialState: EventTitleState = adapter.getInitialState(new EventTitleState());

const eventTitlesReducer = createReducer(initialState,
  on(fromTitles.getAllEventTitlesFiltered, (s: EventTitleState, a) => ({...s, loading: true, loaded: false}  as EventTitleState)),
  on(fromTitles.successGetAllEventTitlesFiltered, (s: EventTitleState, a) => {
    return adapter.addMany(a.payload, {...s, loaded: true, loading: false})  as EventTitleState;
  }),
  on(fromTitles.errorGetAllEventTitlesFiltered, (s: EventTitleState, a) => (
    {...s, logs: {type: 'ERROR', message: a.payload.message}, loading: false, loaded: true}  as EventTitleState
  )),
  on(setEventTitlesFilter, (s: EventTitleState, a) => ({...s, filter: a.payload} as EventTitleState)),
);

export function reducer(state: EventTitleState | undefined, action: Action): EventTitleState {
  return eventTitlesReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

