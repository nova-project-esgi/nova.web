import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

import * as DifficultiesFilterActions from './difficulties-filter.actions';
import * as DifficultiesFilterSelectors from './difficulties-filter.selectors';
import * as fromDifficultiesFilter from './difficulties-filter.reducer';
import {Payload} from '../../../../../shared/redux/payload';
import {HttpErrorResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {DifficultyTranslationNameDto} from '../../../../../shared/models/difficulties/difficulty-translation-name.dto';
import {DifficultyService} from '../../../../../core/services/http/difficulty.service';


@Injectable()
export class DifficultiesFilterEffects {

  loadName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DifficultiesFilterActions.loadNames),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(DifficultiesFilterSelectors.selectFilter))
      )),
      switchMap(([action, filter]) => this.service.getPaginatedDifficultyNamesFiltered(filter).pipe(
        map(names => DifficultiesFilterActions.loadNamesSuccess(new Payload<DifficultyTranslationNameDto[]>(names))),
        catchError(err => of(DifficultiesFilterActions.loadNamesFailure(new Payload<HttpErrorResponse>(err))))
      ))
    );
  });


  constructor(private actions$: Actions, private store: Store<fromDifficultiesFilter.State>, private service: DifficultyService) {
  }

}
