import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

import * as DifficultiesActions from './difficulties.actions';
import * as DifficultiesSelectors from './difficulties.selectors';
import * as fromDifficulties from './difficulties.reducer';

import {Payload} from '../../../../shared/redux/payload';
import {PaginationMetadata} from '../../../../shared/http/pagination/pagination-metadata';
import {HttpErrorResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {DifficultyService} from '../../../../core/services/http/difficulty.service';
import {DetailedDifficultyWithAvailableActionsDto} from '../../../../shared/models/difficulties/detailed-difficulty-with-available-actions.dto';


@Injectable()
export class DifficultiesEffects {
  loadDifficultiesFiltered = createEffect(() => {
    return this.actions$.pipe(
      ofType(DifficultiesActions.loadDifficultiesPageFiltered),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(DifficultiesSelectors.selectPaginationWithFilter))
      )),
      switchMap(([action, paginationWrapper]) => this.difficultiesService.getPaginatedDetailedDifficultiesFiltered(paginationWrapper).pipe(
        map(page => DifficultiesActions.loadDifficultiesPageFilteredSuccess(new Payload<PaginationMetadata<DetailedDifficultyWithAvailableActionsDto>>(page))),
        catchError(err => of(DifficultiesActions.loadDifficultiesPageFilteredFailure(new Payload<HttpErrorResponse>(err))))
      )),
    );
  });

  createDifficulty = createEffect(() => {
    return this.actions$.pipe(
      ofType(DifficultiesActions.createDifficulty),
      switchMap(action => this.difficultiesService.create(action.payload).pipe(
        map(res => DifficultiesActions.createDifficultySuccess()),
        catchError(err => of(DifficultiesActions.createDifficultyFailure(new Payload<HttpErrorResponse>(err))))
      ))
    );
  });

  deleteDifficulty$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DifficultiesActions.deleteDifficulty),
      switchMap(action => this.difficultiesService.delete(action.payload).pipe(
        map(res => DifficultiesActions.deleteDifficultySuccess(action)),
        catchError(err => of(DifficultiesActions.deleteDifficultyFailure(new Payload<HttpErrorResponse>(err))))
      ))
    );
  });

  updateDifficulty$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DifficultiesActions.updateDifficulty),
      switchMap(action => this.difficultiesService
        .update(action.payload, action.payload.id)
        .pipe(
          map(difficulty => DifficultiesActions.updateDifficultySuccess(new Payload<DetailedDifficultyWithAvailableActionsDto>(difficulty))),
          catchError(err => of(DifficultiesActions.updateDifficultyFailure(new Payload<HttpErrorResponse>(err))))
        ))
    );
  });

  constructor(private actions$: Actions, private difficultiesService: DifficultyService, private store: Store<fromDifficulties.State>) {
  }

}
