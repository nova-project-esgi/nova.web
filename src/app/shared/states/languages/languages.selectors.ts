import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromLanguages from './languages.reducer';
import {LanguageDto} from '../../models/languages/language.dto';

export const selectLanguageState = createFeatureSelector<fromLanguages.State>(
  fromLanguages.languagesFeatureKey
);
export const selectLanguages = createSelector(selectLanguageState, fromLanguages.selectAll);
export const selectAll = createSelector(selectLanguages, languages => languages?.map(l => new LanguageDto(l)));
export const hasDefaultLanguage = createSelector(
  selectLanguages,
  languages => languages?.some(l => l.isDefault)
);
