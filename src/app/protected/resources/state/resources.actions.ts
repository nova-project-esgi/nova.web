import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {Payload} from '../../../shared/redux/payload';
import {ImageDetailedResourceEditionDto} from '../../../shared/models/resources/image-detailed-resource-edition.dto';
import {PaginationResume} from '../../../shared/http/pagination/pagination-resume';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {ImageDetailedResourceDto} from '../../../shared/models/resources/image-detailed-resource.dto';
import {ResourcesFilter} from '../../../shared/filters/resources/resources-filter';


export const createResource = createAction(
  '[Resources] Create Resource',
  props<Payload<ImageDetailedResourceEditionDto>>()
);

export const createResourceSuccess = createAction(
  '[Resources] Create Resource Success'
);

export const createResourceFailure = createAction(
  '[Resources] Create Resource Failure',
  props<Payload<HttpErrorResponse>>()
);


export const updateFilter = createAction(
  '[Resources] Update filter',
  props<Payload<ResourcesFilter>>()
);

export const updatePagination = createAction(
  '[Resources] Update pagination',
  props<Payload<PaginationResume>>()
);

export const loadResourcesPageFiltered = createAction(
  '[Resources] Load resources page'
);
export const loadResourcesPageFilteredSuccess = createAction(
  '[Resources] Load resources page filtered Success',
  props<Payload<PaginationMetadata<ImageDetailedResourceDto>>>()
);

export const loadResourcesPageFilteredFailure = createAction(
  '[Resources] Load resources page filtered  Failure',
  props<Payload<HttpErrorResponse>>()
);

export const deleteResource = createAction(
  '[Resources] Delete Resource',
  props<Payload<string>>()
);
export const deleteResourceSuccess = createAction(
  '[Resources] Delete Resource Success',
  props<Payload<string>>()
);
export const deleteResourceFailure = createAction(
  '[Resources] Delete Resource Failure',
  props<Payload<HttpErrorResponse>>()
);

export const updateResource = createAction(
  '[Resources] Update Resource',
  props<Payload<ImageDetailedResourceDto>>()
);
export const updateResourceSuccess = createAction(
  '[Resources] Update Resource Success',
  props<Payload<ImageDetailedResourceDto>>()
);
export const updateResourceFailure = createAction(
  '[Resources] Update Resource Failure',
  props<Payload<HttpErrorResponse>>()
);

export const setNextPage = createAction(
  '[Resources] Set next Resources page '
);

export const setPreviousPage = createAction(
  '[Resources] Set previous Resources page '
);
