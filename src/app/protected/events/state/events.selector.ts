import {createFeatureSelector, createSelector} from '@ngrx/store';
import {EventsState, featureKey} from './index';
import * as fromEventTitles from './event-titles/event-titles.reducer';

export const selectFeature = createFeatureSelector(featureKey);


export const getEventState = createFeatureSelector<EventsState>(featureKey);
export const getTranslatedEventsState = createSelector(
  getEventState,
  state => state.eventsState
);
export const getLanguagesState = createSelector(
  getEventState,
  state => state.languagesState
);
export const getEventTitlesState = createSelector(
  getEventState,
  state => state.titlesState
);

export const getTitleFilter = createSelector(
  getEventTitlesState,
  state => state.filter
);
export const getEventFilter = createSelector(
  getTranslatedEventsState,
  state => state.filter
);
export const getTitles = createSelector(
  getEventTitlesState,
  fromEventTitles.selectAll
);
export const getEvents = createSelector(
  getTranslatedEventsState,
  state => state.entities
);
