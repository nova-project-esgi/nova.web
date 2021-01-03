import { createAction, props } from '@ngrx/store';
import {Payload} from '../../redux/payload';
import {LanguageDto} from '../../models/languages/language.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {LanguageEditionDto} from '../../models/languages/language-edition.dto';

export const loadLanguages = createAction(
  '[Languages] Load Languages'
);
export const loadLanguagesSuccess = createAction(
  '[Languages] Load Languages Success',
  props<Payload<LanguageDto[]>>()
);

export const loadLanguagesFailure = createAction(
  '[Languages] Load Languages Failure',
  props<Payload<HttpErrorResponse>>()
);

