import {EventsState, featureKey} from './index';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const getEventState = createFeatureSelector<EventsState>(featureKey);
export const getTranslatedEventsState = createSelector(
  getEventState,
  state => state.events
);
export const getLanguagesState = createSelector(
  getEventState,
  state => state.languages
);
