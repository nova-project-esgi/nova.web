import * as fromRoot from '../../../../core/state/state';
import {TranslatedEventsEffects} from './translated-events.effects';
import {reducer as red, TranslatedEventsState} from './translated-events.reducers';

export const featureKey = 'translatedEvent';

export interface State extends fromRoot.State {
  event: TranslatedEventsState;
}

export const effects: any[] = [TranslatedEventsEffects];
export const reducer = red;
