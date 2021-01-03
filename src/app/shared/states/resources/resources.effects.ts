import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, withLatestFrom, switchMap} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as ResourcesActions from './resources.actions';
import * as ResourcesSelectors from '../../../protected/resources/state/resources.selectors';
import {Payload} from '../../redux/payload';
import {PaginationMetadata} from '../../http/pagination/pagination-metadata';
import {ImageDetailedResourceDto} from '../../models/resources/image-detailed-resource.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {ResourceService} from '../../../core/services/http/resource.service';



@Injectable()
export class ResourcesEffects {

  loadResources = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcesActions.loadResources),
      switchMap(() => this.resourceService.getAllImageDetailedResources().pipe(
        map(resources => ResourcesActions.loadResourcesSuccess(new Payload<ImageDetailedResourceDto[]>(resources))),
        catchError(err => of(ResourcesActions.loadResourcesFailure(new Payload<HttpErrorResponse>(err))))
      )),
    );
  });



  constructor(private actions$: Actions, private resourceService: ResourceService) {}

}
