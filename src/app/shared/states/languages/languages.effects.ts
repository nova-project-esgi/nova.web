import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import {loadLanguages, loadLanguagesFailure, loadLanguagesSuccess} from './languages.actions';
import {TypedAction} from '@ngrx/store/src/models';
import {Payload} from '../../redux/payload';
import {LanguageDto} from '../../models/languages/language.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {LanguageService} from '../../../core/services/http/language.service';
import {LanguageEditionDto} from '../../models/languages/language-edition.dto';


@Injectable()
export class LanguagesEffects {

  loadLanguages$ = createEffect(() => this.actions$.pipe(
    ofType(loadLanguages.type),
    switchMap((action: TypedAction<string>) => this.languageService.getAll().pipe(
      map(languages => loadLanguagesSuccess(new Payload<LanguageDto[]>(languages))),
      catchError(err => of(loadLanguagesFailure(new Payload<HttpErrorResponse>(err))))
    )),
  ));

  constructor(private actions$: Actions, private languageService: LanguageService) {
  }

}
