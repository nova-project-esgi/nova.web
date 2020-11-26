import * as fromRoot from '../../../../core/state/state';
import {EventTitleEffects} from './event-titles.effect';
import {reducer as red} from './event-titles.reducer';
import {LoadableLogEntityState} from '../../../../shared/redux/states/loadable-log-entity.state';
import {EventTranslationTitleDto} from '../../../../shared/models/events/event-translation-title.dto';
import {TranslatedEventsTitleFilter} from '../../../../shared/filters/events/translated-events-title.filter';

export class EventTitleState extends LoadableLogEntityState<EventTranslationTitleDto>{
  filter: TranslatedEventsTitleFilter = new TranslatedEventsTitleFilter();
}

export interface State extends fromRoot.State {
  title: EventTitleState;
}

export const reducer = red;
export const effects: any[] = [EventTitleEffects];
