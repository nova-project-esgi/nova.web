import {createAction, props} from '@ngrx/store';
import {Payload} from '../../../../shared/redux/payload';
import {ResourcesFilter} from '../../../../shared/filters/resources/resources-filter';
import {HttpErrorResponse} from '@angular/common/http';
import {ResourceNameTranslationDto} from '../../../../shared/models/resources/resource-name-translation.dto';

export const updateFilter = createAction(
  '[ResourcesFilter] Update Filter',
  props<Payload<ResourcesFilter>>()
);

export const loadNames = createAction(
  '[ResourcesFilter] Load Names'
);

export const loadNamesSuccess = createAction(
  '[ResourcesFilter] Load Name Success',
  props<Payload<ResourceNameTranslationDto[]>>()
);

export const loadNamesFailure = createAction(
  '[ResourcesFilter] Load Name Failure',
  props<Payload<HttpErrorResponse>>()
);

