import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as LanguagesFilterActions from './languages-filter.actions';
import {TypedAction} from '@ngrx/store/src/models';
import {Payload} from '../../../../shared/redux/payload';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {LanguageService} from '../../../../core/services/http/language.service';



@Injectable()
export class LanguagesFilterEffects {
  loadLanguages$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesFilterActions.loadLanguages.type),
    switchMap((action: TypedAction<string>) => this.languageService.getAll().pipe(
      map(languages => LanguagesFilterActions.loadLanguagesSuccess(new Payload<LanguageDto[]>(languages))),
      catchError(err => of(LanguagesFilterActions.loadLanguagesFailure(new Payload<HttpErrorResponse>(err))))
    )),
  ));

  constructor(private actions$: Actions, private languageService: LanguageService) {}

}
