import {createReducer, on} from '@ngrx/store';
import * as EventsFilterActions from './events-filter.actions';
import {LoadableLogState} from '../../../../shared/redux/states/loadable-log.state';
import {TranslatedEventsTitleFilter} from '../../../../shared/filters/events/translated-events-title.filter';
import {EventTranslationTitleDto} from '../../../../shared/models/events/event-translation-title.dto';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import * as LanguagesActions from '../../../../shared/states/languages/languages.actions';

export const eventsFilterFeatureKey = 'eventsFilter';

export class State extends LoadableLogState {
  filter: TranslatedEventsTitleFilter = new TranslatedEventsTitleFilter();
  titles: EventTranslationTitleDto[] = [];
}

export const initialState: State = new State();


export const reducer = createReducer(
  initialState,
  on(EventsFilterActions.loadTitles, state => LoadableLogState.toLoadState(state, EventsFilterActions.loadTitles)),
  on(EventsFilterActions.updateFilter, (state, a) => ({...state, filter: a.payload})),
  on(EventsFilterActions.loadTitlesSuccess, (state, action) => {
    return {...LoadableLogState.toLoadSuccessState(state, EventsFilterActions.loadTitlesSuccess), titles: action.payload};
  }),
  on(EventsFilterActions.loadTitlesFailure, (state, action) => LoadableLogState.toLoadFailureState(state, action)),
);

