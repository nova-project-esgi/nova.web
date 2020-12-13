import { createAction, props } from '@ngrx/store';
import {Payload} from '../../../../shared/redux/payload';
import {LanguagesFilter} from '../../../../shared/filters/languages/languages.filter';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslatedEventsFilter} from '../../../../shared/filters/events/translated-events.filter';
import {PaginationResume} from '../../../../shared/http/pagination/pagination-resume';

export const updateFilter = createAction(
  '[LanguagesFilter] Update LanguagesFilters',
  props<Payload<LanguagesFilter>>()
);


export const loadLanguages = createAction(
  '[LanguagesFilter] Load languages'
);

export const loadLanguagesSuccess = createAction(
  '[LanguagesFilter] Load languages Success',
  props<Payload<LanguageDto[]>>()
);

export const loadLanguagesFailure = createAction(
  '[LanguagesFilter] Load languages Failure',
  props<Payload<HttpErrorResponse>>()
);
