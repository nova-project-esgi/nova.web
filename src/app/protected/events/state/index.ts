import * as fromRoot from '../../../core/state/state';
import {ActionReducerMap} from '@ngrx/store';
import * as fromTranslatedEvents from './translated-event';
import * as fromLanguages from '../../../shared/redux/state/languages';
import * as fromTitles from './event-titles';
import {LoadableLogEntityState} from '../../../shared/redux/states/loadable-log-entity.state';
import {LanguageDto} from '../../../shared/models/languages/language.dto';
import {TranslatedEventsState} from './translated-event/translated-events.reducers';

export const featureKey = 'eventFeature';

export interface EventsState extends fromLanguages.LanguageState {
  titlesState: fromTitles.EventTitleState;
  eventsState: TranslatedEventsState;
  languagesState: LoadableLogEntityState<LanguageDto>;
}


export interface State extends fromRoot.State {
  [featureKey]: EventsState;
}


export const reducers: ActionReducerMap<EventsState> = {
  eventsState: fromTranslatedEvents.reducer,
  languagesState: fromLanguages.reducers.languagesState,
  titlesState: fromTitles.reducer
};
export const effects: any[] = [...fromTranslatedEvents.effects, ...fromLanguages.effects, ...fromTitles.effects];
