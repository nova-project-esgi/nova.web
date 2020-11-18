import {createAction, props} from '@ngrx/store';
import {Payload} from '../../redux/payload';
import {HttpErrorResponse} from '@angular/common/http';
import {LanguageDto} from '../../models/languages/language.dto';

export enum ActionTypes {
  GET_ALL_LANGUAGES = '[languages] Get all languages',
  SUCCESS_GET_ALL_LANGUAGES = '[languages] Success get all languages',
  ERROR_GET_ALL_LANGUAGES = '[languages] Error get all languages',
}

export const getAllLanguages = createAction(ActionTypes.GET_ALL_LANGUAGES);
export const successGetAllLanguages = createAction(ActionTypes.SUCCESS_GET_ALL_LANGUAGES, props<Payload<LanguageDto[]>>());
export const errorGetAllLanguages = createAction(ActionTypes.ERROR_GET_ALL_LANGUAGES, props<Payload<HttpErrorResponse>>());

