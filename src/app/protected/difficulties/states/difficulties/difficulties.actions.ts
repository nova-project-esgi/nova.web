import {createAction, props} from '@ngrx/store';
import {Payload} from '../../../../shared/redux/payload';
import {HttpErrorResponse} from '@angular/common/http';
import {PaginationResume} from '../../../../shared/http/pagination/pagination-resume';
import {PaginationMetadata} from '../../../../shared/http/pagination/pagination-metadata';
import {DetailedDifficultyEdition} from '../../../../shared/models/difficulties/detailed-difficulty-edition';
import {DifficultiesFilter} from '../../../../shared/filters/difficulties/difficulties.filter';
import {DetailedDifficultyWithAvailableActionsDto} from '../../../../shared/models/difficulties/detailed-difficulty-with-available-actions.dto';


export const createDifficulty = createAction(
  '[Difficulties] Create Difficulty',
  props<Payload<DetailedDifficultyEdition>>()
);

export const createDifficultySuccess = createAction(
  '[Difficulties] Create Difficulty Success'
);

export const createDifficultyFailure = createAction(
  '[Difficulties] Create Difficulty Failure',
  props<Payload<HttpErrorResponse>>()
);


export const updateFilter = createAction(
  '[Difficulties] Update filter',
  props<Payload<DifficultiesFilter>>()
);

export const updatePagination = createAction(
  '[Difficulties] Update pagination',
  props<Payload<PaginationResume>>()
);

export const loadDifficultiesPageFiltered = createAction(
  '[Difficulties] Load resources page'
);
export const loadDifficultiesPageFilteredSuccess = createAction(
  '[Difficulties] Load resources page filtered Success',
  props<Payload<PaginationMetadata<DetailedDifficultyWithAvailableActionsDto>>>()
);

export const loadDifficultiesPageFilteredFailure = createAction(
  '[Difficulties] Load resources page filtered  Failure',
  props<Payload<HttpErrorResponse>>()
);

export const deleteDifficulty = createAction(
  '[Difficulties] Delete Difficulty',
  props<Payload<string>>()
);
export const deleteDifficultySuccess = createAction(
  '[Difficulties] Delete Difficulty Success',
  props<Payload<string>>()
);
export const deleteDifficultyFailure = createAction(
  '[Difficulties] Delete Difficulty Failure',
  props<Payload<HttpErrorResponse>>()
);

export const updateDifficulty = createAction(
  '[Difficulties] Update Difficulty',
  props<Payload<DetailedDifficultyEdition>>()
);
export const updateDifficultySuccess = createAction(
  '[Difficulties] Update Difficulty Success',
  props<Payload<DetailedDifficultyWithAvailableActionsDto>>()
);
export const updateDifficultyFailure = createAction(
  '[Difficulties] Update Difficulty Failure',
  props<Payload<HttpErrorResponse>>()
);
