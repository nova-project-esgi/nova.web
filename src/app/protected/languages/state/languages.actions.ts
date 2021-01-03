import { createAction, props } from '@ngrx/store';
import {Payload} from '../../../shared/redux/payload';
import {LanguageEditionDto} from '../../../shared/models/languages/language-edition.dto';
import {LanguageDto} from '../../../shared/models/languages/language.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {PaginationResume} from '../../../shared/http/pagination/pagination-resume';
import {LanguagesFilter} from '../../../shared/filters/languages/languages.filter';
import {LanguageWithAvailableActionsDto} from '../../../shared/models/languages/language-with-available-actions.dto';

export const updateFilter = createAction(
  '[Languages] Update filter',
  props<Payload<LanguagesFilter>>()
);

export const updatePagination = createAction(
  '[Languages] Update pagination',
  props<Payload<PaginationResume>>()
);

export const loadLanguagesPageFiltered = createAction(
  '[Languages] Load languages page'
);
export const loadLanguagesPageFilteredSuccess = createAction(
  '[Languages] Load languages page filtered Success',
  props<Payload<PaginationMetadata<LanguageWithAvailableActionsDto>>>()
);

export const loadLanguagesPageFilteredFailure = createAction(
  '[Languages] Load languages page filtered  Failure',
  props<Payload<HttpErrorResponse>>()
);

export const createLanguage = createAction(
  '[Languages] Create Language',
  props<Payload<LanguageEditionDto>>()
);
export const createLanguageSuccess = createAction(
  '[Languages] Create Language Success'
);
export const createLanguageFailure = createAction(
  '[Languages] Create Language Failure',
  props<Payload<HttpErrorResponse>>()
);
export const deleteLanguage = createAction(
  '[Languages] Delete Language',
  props<Payload<string>>()
);
export const deleteLanguageSuccess = createAction(
  '[Languages] Delete Language Success',
  props<Payload<string>>()
);
export const deleteLanguageFailure = createAction(
  '[Languages] Delete Language Failure',
  props<Payload<HttpErrorResponse>>()
);

export const updateLanguage = createAction(
  '[Languages] Update Language',
  props<Payload<LanguageWithAvailableActionsDto>>()
);
export const updateLanguageSuccess = createAction(
  '[Languages] Update Language Success',
  props<Payload<LanguageWithAvailableActionsDto>>()
);
export const updateLanguageFailure = createAction(
  '[Languages] Update Language Failure',
  props<Payload<HttpErrorResponse>>()
);

export const canCreate = createAction(
  '[Languages] Can create Languages ',
  props<Payload<LanguageWithAvailableActionsDto>>()
);
export const canCreateSuccess = createAction(
  '[Languages] Can create Languages  Success',
  props<Payload<boolean>>()
);
export const canCreateFailure = createAction(
  '[Languages] Can create Languages  Failure',
  props<Payload<HttpErrorResponse>>()
);

export const canUpdate = createAction(
  '[Languages] Can update Languages ',
  props<Payload<LanguageWithAvailableActionsDto>>()
);
export const canUpdateSuccess = createAction(
  '[Languages] Can update Languages  Success',
  props<Payload<LanguageWithAvailableActionsDto>>()
);
export const canUpdateFailure = createAction(
  '[Languages] Can update Languages  Failure',
  props<Payload<HttpErrorResponse>>()
);

export const setNextPage = createAction(
  '[Languages] Set next Languages page '
);

export const setPreviousPage = createAction(
  '[Languages] Set previous Languages page '
);
