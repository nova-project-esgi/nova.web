import { createAction, props } from '@ngrx/store';
import {Payload} from '../../../../../shared/redux/payload';
import {LanguageDto} from '../../../../../shared/models/languages/language.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {DifficultiesFilter} from '../../../../../shared/filters/difficulties/difficulties.filter';
import {DifficultyTranslationNameDto} from '../../../../../shared/models/difficulties/difficulty-translation-name.dto';

export const updateFilter = createAction(
  '[DifficultiesFilter] Update DifficultiesFilters',
  props<Payload<DifficultiesFilter>>()
);


export const loadNames = createAction(
  '[DifficultiesFilter] Load names'
);

export const loadNamesSuccess = createAction(
  '[DifficultiesFilter] Load names Success',
  props<Payload<DifficultyTranslationNameDto[]>>()
);

export const loadNamesFailure = createAction(
  '[DifficultiesFilter] Load names Failure',
  props<Payload<HttpErrorResponse>>()
);
