import {createSelector} from '@ngrx/store';
import * as fromTranslatedEvent from './translated-events.reducers';
import {LoadableLogEntityState} from '../../states/loadable-log-entity.state';
import {TranslatedEventDto} from '../../models/events/translated-event.dto';



export const selectTranslatedEvents = (selector) => createSelector((selector), fromTranslatedEvent.selectAll);
export const selectTranslatedEventId = (selector) => createSelector(selector, (eventState: LoadableLogEntityState<TranslatedEventDto>) => eventState.selectedId);
export const selectTranslatedEvent = (selector) => createSelector(selectTranslatedEvents(selector), selectTranslatedEventId(selector), (events, id) => {
  return events.find(e => e.id === id);
});


