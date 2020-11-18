import {LoadableLogEntityState} from '../../../shared/states/loadable-log-entity.state';
import {TranslatedEventDto} from '../../../shared/models/events/translated-event.dto';
import * as fromRoot from '../../../core/state/state';
import {ActionReducerMap} from '@ngrx/store';
import {LanguageDto} from '../../../shared/models/languages/language.dto';
import * as fromTranslatedEvents from '../../../shared/state/translated-event';
import * as fromLanguages from '../../../shared/state/languages';

export const featureKey = 'eventFeature';

export interface EventsState extends fromTranslatedEvents.TranslatedEventState, fromLanguages.LanguageState {
  events: LoadableLogEntityState<TranslatedEventDto>;
  languages: LoadableLogEntityState<LanguageDto>;
}

export interface State extends fromRoot.State {
  [featureKey]: EventsState;
}

export const reducers: ActionReducerMap<EventsState> = {
  events: fromTranslatedEvents.reducers.events,
  languages: fromLanguages.reducers.languages
};
export const effects: any[] = [...fromTranslatedEvents.effects, ...fromLanguages.effects];
