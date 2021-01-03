import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromDifficulties from './difficulties.reducer';
import * as DifficultiesActions from './difficulties.actions';
import {PaginationWrapper} from '../../../../shared/http/pagination/pagination-wrapper';
import {DetailedDifficultyWithAvailableActionsDto} from '../../../../shared/models/difficulties/detailed-difficulty-with-available-actions.dto';

export const selectDifficultiesState = createFeatureSelector<fromDifficulties.State>(
  fromDifficulties.difficultiesFeatureKey
);


export const selectLogs = createSelector(
  selectDifficultiesState,
  s => s.logs
);
export const difficultyCreated = createSelector(
  selectLogs,
  logs => logs.type === 'SUCCESS' && logs.message === DifficultiesActions.createDifficultySuccess.type
);

export const selectPaginationResume = createSelector(
  selectDifficultiesState,
  state => state.paginationResume
);
export const selectFilter = createSelector(
  selectDifficultiesState,
  state => state.filter
);
export const selectPaginationWithFilter = createSelector(
  selectPaginationResume,
  selectFilter,
  (pagination, filter) => new PaginationWrapper({page: pagination?.page, size: pagination?.size, content: filter})
);

const selectAll = createSelector(
  selectDifficultiesState,
  fromDifficulties.selectAll
);

export const selectDifficulties = createSelector(
  selectAll,
  difficulties => difficulties?.map(r => new DetailedDifficultyWithAvailableActionsDto(r)) ?? []
);


export const selectCanCreate = createSelector(
  selectDifficultiesState,
  s => s.canCreate
);

export const selectIsDeleted = createSelector(
  selectDifficultiesState,
  s => s.logs.type === 'SUCCESS' && s.logs.message === DifficultiesActions.deleteDifficulty.type
);
