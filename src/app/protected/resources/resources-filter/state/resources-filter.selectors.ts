import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromResourcesFilter from './resources-filter.reducer';

export const selectResourcesFilterState = createFeatureSelector<fromResourcesFilter.State>(
  fromResourcesFilter.resourcesFilterFeatureKey
);

export const selectFilter = createSelector(
  selectResourcesFilterState,
  state => state.filter
);
export const selectNames = createSelector(
  selectResourcesFilterState,
  state => state.names
);
