import {createSelector} from '@ngrx/store';
import * as fromLanguages from './languages.reducers';
import {LoadableLogEntityState} from '../../states/loadable-log-entity.state';
import {LanguageDto} from '../../models/languages/language.dto';

export const selectLanguages = (selector) => createSelector(selector, fromLanguages?.selectAll);
export const selectLanguage = (selector) => createSelector(selector, fromLanguages?.selectAll,
  (s1: LoadableLogEntityState<LanguageDto>, s2) => s2.find(language => s1.selectedId));

