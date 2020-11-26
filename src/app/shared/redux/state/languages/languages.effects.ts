import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LanguageService} from '../../../../core/services/http/language.service';
import * as LanguageActions from './language.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Payload} from '../../payload';
import {TypedAction} from '@ngrx/store/src/models';
import {LanguageDto} from '../../../models/languages/language.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class LanguagesEffects {
  getAllLanguages$ = createEffect(() => this.actions$.pipe(
    ofType(LanguageActions.ActionTypes.GET_ALL_LANGUAGES),
    switchMap((action: TypedAction<string>) => this.languageService.getAll()),
    map(languages => LanguageActions.successGetAllLanguages(new Payload<LanguageDto[]>(languages))),
    catchError(err => of(LanguageActions.errorGetAllLanguages(new Payload<HttpErrorResponse>(err))))
  ));

  constructor(private languageService: LanguageService, private actions$: Actions) {
  }
}
