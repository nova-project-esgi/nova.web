import * as fromRoot from '../../../core/state/state';
import {LoadableLogEntityState} from '../../states/loadable-log-entity.state';
import {ActionReducerMap} from '@ngrx/store';
import * as fromLanguages from '../languages';
import * as fromTranslatedEvents from './translated-events.reducers';
import {TranslatedEventDto} from '../../models/events/translated-event.dto';
import {TranslatedEventsEffects} from './translated-events.effects';

export const featureKey = 'translatedEvent';

export interface TranslatedEventState{
  events: LoadableLogEntityState<TranslatedEventDto>;
}

export interface State extends fromRoot.State {
  event: TranslatedEventState;
}

export const reducers: ActionReducerMap<TranslatedEventState> = {events: fromTranslatedEvents.reducer};
export const effects: any[] = [TranslatedEventsEffects];
