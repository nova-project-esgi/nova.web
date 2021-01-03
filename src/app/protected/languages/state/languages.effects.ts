import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

import * as LanguagesActions from './languages.actions';
import * as fromLanguages from './languages.reducer';
import * as LanguagesSelectors from './languages.selectors';
import {Payload} from '../../../shared/redux/payload';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {HttpErrorResponse} from '@angular/common/http';
import {LanguageDto} from '../../../shared/models/languages/language.dto';
import {Store} from '@ngrx/store';
import {LanguageService} from '../../../core/services/http/language.service';
import {LanguageEditionDto} from '../../../shared/models/languages/language-edition.dto';
import {LanguagesFilter} from '../../../shared/filters/languages/languages.filter';
import {PaginationWrapper} from '../../../shared/http/pagination/pagination-wrapper';
import {LanguageWithAvailableActionsDto} from '../../../shared/models/languages/language-with-available-actions.dto';


@Injectable()
export class LanguagesEffects {

  loadLanguagesFiltered = createEffect(() => {
    return this.actions$.pipe(
      ofType(LanguagesActions.loadLanguagesPageFiltered),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(LanguagesSelectors.selectPaginationWithFilter))
      )),
      switchMap(([action, paginationWrapper]) => this.languageService.getPaginatedLanguagesWithAvailableActionsFiltered(paginationWrapper).pipe(
        map(page => LanguagesActions.loadLanguagesPageFilteredSuccess(new Payload<PaginationMetadata<LanguageWithAvailableActionsDto>>(page))),
        catchError(err => of(LanguagesActions.loadLanguagesPageFilteredFailure(new Payload<HttpErrorResponse>(err))))
      )),
    );
  });
  createLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActions.createLanguage.type),
    switchMap((action: Payload<LanguageEditionDto>) => this.languageService.create(action.payload).pipe(
      map(language => LanguagesActions.createLanguageSuccess()),
      catchError(err => of(LanguagesActions.createLanguageFailure(new Payload<HttpErrorResponse>(err))))
    )),
  ));
  updateLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActions.updateLanguage.type),
    switchMap((action: Payload<LanguageWithAvailableActionsDto>) => this.languageService.update(action.payload).pipe(
      map(language => LanguagesActions.updateLanguageSuccess(action)),
      catchError(err => of(LanguagesActions.updateLanguageFailure(new Payload<HttpErrorResponse>(err))))
    )),
  ));

  deleteLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActions.deleteLanguage.type),
    switchMap((action: Payload<string>) => this.languageService.delete(action.payload).pipe(
      map(language => LanguagesActions.deleteLanguageSuccess(action)),
      catchError(err => of(LanguagesActions.deleteLanguageFailure(new Payload<HttpErrorResponse>(err))))
    )),
  ));


  canCreateLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActions.canCreate.type),
    switchMap((action: Payload<LanguageEditionDto>) => this.languageService.getPaginatedLanguagesFiltered(
      new PaginationWrapper<LanguagesFilter>(
        {content: new LanguagesFilter({subCode: action.payload.subCode, code: action.payload.code})}
      )
    ).pipe(
      map(page => LanguagesActions.canCreateSuccess(new Payload<boolean>(
        this.hasDuplicate(page.values, action.payload)))
      ),
      catchError(err => of(LanguagesActions.canCreateFailure(new Payload<HttpErrorResponse>(err))))
    )),
  ));

  canUpdateLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActions.canUpdate.type),
    switchMap((action: Payload<LanguageDto>) => this.languageService.getPaginatedLanguagesFiltered(
      new PaginationWrapper<LanguagesFilter>(
        {content: new LanguagesFilter({subCode: action.payload.subCode, code: action.payload.code})}
      )
    ).pipe(
      map(page => LanguagesActions.canUpdateSuccess(new Payload<LanguageWithAvailableActionsDto>(
        new LanguageWithAvailableActionsDto({...action.payload, canUpdate: this.hasDuplicate(page.values, action.payload, action.payload.id)})
        ))
      ),
      catchError(err => of(LanguagesActions.canUpdateFailure(new Payload<HttpErrorResponse>(err))))
    )),
  ));

  private hasDuplicate(languages: LanguageDto[], language: LanguageEditionDto, id: string = null): boolean {
    return languages?.length === 0 ||
      !languages.some(l => l.id !== id &&  l.code === language.code && l.subCode === language.subCode  );
  }

  constructor(private actions$: Actions, private store: Store<fromLanguages.State>, private languageService: LanguageService) {
  }

}
