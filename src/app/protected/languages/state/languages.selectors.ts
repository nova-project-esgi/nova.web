import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromLanguages from './languages.reducer';
import * as LanguagesActions from './languages.actions';
import {PaginationWrapper} from '../../../shared/http/pagination/pagination-wrapper';
import {LanguageDto} from '../../../shared/models/languages/language.dto';
import {LanguageWithAvailableActionsDto} from '../../../shared/models/languages/language-with-available-actions.dto';

export const selectLanguagesState = createFeatureSelector<fromLanguages.State>(
  fromLanguages.languagesFeatureKey
);
export const selectPaginationResume = createSelector(
  selectLanguagesState,
  state => state?.paginationResume
);
export const selectFilter = createSelector(
  selectLanguagesState,
  state => state.filter
);
export const selectPaginationWithFilter = createSelector(
  selectPaginationResume,
  selectFilter,
  (pagination, filter) => new PaginationWrapper({page: pagination?.page, size: pagination?.size, content: filter})
);

const selectAll = createSelector(
  selectLanguagesState,
  fromLanguages.selectAll
);

export const selectLanguages = createSelector(
  selectAll,
  languages => languages?.map(l => new LanguageWithAvailableActionsDto(l))
);

export const selectLanguageById = createSelector(
  selectLanguages,
  (languages: LanguageDto[], id: { id: string }) => languages.find(l => l.id === id.id)
);


export const selectCanCreate = createSelector(
  selectLanguagesState,
  s => s.canCreate
);

export const selectIsDeleted = createSelector(
  selectLanguagesState,
  s => s?.logs.type === 'SUCCESS' && s?.logs.message === LanguagesActions.deleteLanguageSuccess.type
);

