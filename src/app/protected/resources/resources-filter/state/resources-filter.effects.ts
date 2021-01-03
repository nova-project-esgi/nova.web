import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

import * as ResourcesFilterActions from './resources-filter.actions';
import * as ResourcesFilterSelectors from './resources-filter.selectors';
import * as fromResourcesFilter from './resources-filter.reducer';
import {Store} from '@ngrx/store';
import {ResourceService} from '../../../../core/services/http/resource.service';
import {ResourceNameTranslationDto} from '../../../../shared/models/resources/resource-name-translation.dto';
import {Payload} from '../../../../shared/redux/payload';
import {HttpErrorResponse} from '@angular/common/http';


@Injectable()
export class ResourcesFilterEffects {


  loadName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcesFilterActions.loadNames),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(ResourcesFilterSelectors.selectFilter))
      )),
      switchMap(([action, filter]) => this.service.getPaginatedResourceNamesFiltered(filter).pipe(
        map(names => ResourcesFilterActions.loadNamesSuccess(new Payload<ResourceNameTranslationDto[]>(names))),
        catchError(err => of(ResourcesFilterActions.loadNamesFailure(new Payload<HttpErrorResponse>(err))))
      ))
    );
  });


  constructor(private actions$: Actions, private store: Store<fromResourcesFilter.State>, private service: ResourceService) {
  }
}
