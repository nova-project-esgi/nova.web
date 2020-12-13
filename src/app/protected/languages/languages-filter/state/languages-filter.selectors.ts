import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLanguagesFilter from './languages-filter.reducer';

export const selectLanguagesFilterState = createFeatureSelector<fromLanguagesFilter.State>(
  fromLanguagesFilter.languagesFilterFeatureKey
);

export const selectFilter = createSelector(
  selectLanguagesFilterState,
  state => state.filter
);
export const selectLanguages = createSelector(
  selectLanguagesFilterState,
  state => state.languages
);

