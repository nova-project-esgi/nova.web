import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromDifficulties from './difficulties.reducer';
import {DetailedDifficultyDto} from '../../models/difficulties/detailed-difficulty.dto';

export const selectDifficultiesState = createFeatureSelector<fromDifficulties.State>(
  fromDifficulties.difficultiesFeatureKey
);
const selectAll = createSelector(selectDifficultiesState, fromDifficulties.selectAll);
export const selectDifficulties = createSelector(selectAll, difficulties => difficulties?.map(d => new DetailedDifficultyDto(d)));

export const hasDefaultDifficulty = createSelector(
  selectDifficulties,
  difficulties => difficulties?.some(d => d.isDefault)
);
