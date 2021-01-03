import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as DifficultiesActions from './difficulties.actions';
import {loadLanguages, loadLanguagesFailure, loadLanguagesSuccess} from '../languages/languages.actions';
import {TypedAction} from '@ngrx/store/src/models';
import {Payload} from '../../redux/payload';
import {LanguageDto} from '../../models/languages/language.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {DifficultyService} from '../../../core/services/http/difficulty.service';
import {DetailedDifficultyDto} from '../../models/difficulties/detailed-difficulty.dto';



@Injectable()
export class DifficultiesEffects {

  loadDifficulties$ = createEffect(() => this.actions$.pipe(
    ofType(DifficultiesActions.loadDifficulties),
    switchMap((action: TypedAction<string>) => this.difficultiesService.getAllDetailed().pipe(
      map(difficulties => DifficultiesActions.loadDifficultiesSuccess(new Payload<DetailedDifficultyDto[]>(difficulties))),
      catchError(err => of(DifficultiesActions.loadDifficultiesFailure(new Payload<HttpErrorResponse>(err))))
    )),
  ));




  constructor(private actions$: Actions, private difficultiesService: DifficultyService) {}

}
