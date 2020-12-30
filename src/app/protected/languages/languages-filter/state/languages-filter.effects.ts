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


  constructor(private actions$: Actions) {}

}
