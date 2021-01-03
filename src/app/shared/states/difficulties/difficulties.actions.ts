import {createAction, props} from '@ngrx/store';
import {DetailedDifficultyDto} from '../../models/difficulties/detailed-difficulty.dto';
import {Payload} from '../../redux/payload';
import {HttpErrorResponse} from '@angular/common/http';

export const loadDifficulties = createAction(
  '[Difficulties] Load Difficulties'
);

export const loadDifficultiesSuccess = createAction(
  '[Difficulties] Load Difficulties Success',
  props<Payload<DetailedDifficultyDto[]>>()
);

export const loadDifficultiesFailure = createAction(
  '[Difficulties] Load Difficulties Failure',
  props<Payload<HttpErrorResponse>>()
);
