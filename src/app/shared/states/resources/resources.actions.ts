import { createAction, props } from '@ngrx/store';
import {ImageDetailedResourceDto} from '../../models/resources/image-detailed-resource.dto';
import {Payload} from '../../redux/payload';
import {HttpErrorResponse} from '@angular/common/http';

export const loadResources = createAction(
  '[Resources] Load Resources'
);

export const loadResourcesSuccess = createAction(
  '[Resources] Load Resources Success',
  props<Payload<ImageDetailedResourceDto[]>>()
);

export const loadResourcesFailure = createAction(
  '[Resources] Load Resources Failure',
  props<Payload<HttpErrorResponse>>()
);
