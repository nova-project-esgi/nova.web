import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromDifficultiesFilter from './difficulties-filter.reducer';

export const selectDifficultiesFilterState = createFeatureSelector<fromDifficultiesFilter.State>(
  fromDifficultiesFilter.difficultiesFilterFeatureKey
);
export const selectFilter = createSelector(
  selectDifficultiesFilterState,
  state => state.filter
);
export const selectNames = createSelector(
  selectDifficultiesFilterState,
  state => state.names
);
