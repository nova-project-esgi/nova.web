import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEventsFilter from './events-filter.reducer';

export const selectEventsFilterState = createFeatureSelector<fromEventsFilter.State>(
  fromEventsFilter.eventsFilterFeatureKey
);

export const selectFilter = createSelector(
  selectEventsFilterState,
  state => state.filter
);

export const selectTitles = createSelector(
  selectEventsFilterState,
  state => state.titles
);
