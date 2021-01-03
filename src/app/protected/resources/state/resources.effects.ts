import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

import * as ResourcesActions from './resources.actions';
import * as fromResources from './resources.reducer';
import * as ResourcesSelectors from './resources.selectors';
import {ResourceService} from '../../../core/services/http/resource.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Payload} from '../../../shared/redux/payload';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {Store} from '@ngrx/store';
import {ImageDetailedResourceDto} from '../../../shared/models/resources/image-detailed-resource.dto';


@Injectable()
export class ResourcesEffects {
  loadResourcesFiltered = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcesActions.loadResourcesPageFiltered),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(ResourcesSelectors.selectPaginationWithFilter))
      )),
      switchMap(([action, paginationWrapper]) => this.resourceService.getPaginatedImageDetailedResourcesFiltered(paginationWrapper).pipe(
        map(page => ResourcesActions.loadResourcesPageFilteredSuccess(new Payload<PaginationMetadata<ImageDetailedResourceDto>>(page))),
        catchError(err => of(ResourcesActions.loadResourcesPageFilteredFailure(new Payload<HttpErrorResponse>(err))))
      )),
    );
  });

  createResource$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcesActions.createResource),
      switchMap(action => this.resourceService.create(action.payload).pipe(
        map(res => ResourcesActions.createResourceSuccess()),
        catchError(err => of(ResourcesActions.createResourceFailure(new Payload<HttpErrorResponse>(err))))
      ))
    );
  });

  deleteResource$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcesActions.deleteResource),
      switchMap(action => this.resourceService.delete(action.payload).pipe(
        map(res => ResourcesActions.deleteResourceSuccess(action)),
        catchError(err => of(ResourcesActions.deleteResourceFailure(new Payload<HttpErrorResponse>(err))))
      ))
    );
  });

  updateResource$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcesActions.updateResource),
      switchMap(action => this.resourceService
        .update(action.payload.toResourceWithTranslationEdition(), action.payload.icon, action.payload.id)
        .pipe(
          map(res => ResourcesActions.updateResourceSuccess(action)),
          catchError(err => of(ResourcesActions.updateResourceFailure(new Payload<HttpErrorResponse>(err))))
        ))
    );
  });

  constructor(private actions$: Actions, private resourceService: ResourceService, private store: Store<fromResources.State>) {
  }

}
