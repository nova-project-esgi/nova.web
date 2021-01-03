import {createReducer, on} from '@ngrx/store';
import {LoadableLogEntityState} from '../../../../shared/redux/states/loadable-log-entity.state';
import {PaginationResume} from '../../../../shared/http/pagination/pagination-resume';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import * as DifficultiesActions from './difficulties.actions';
import * as LanguagesActions from '../../../languages/state/languages.actions';
import {PaginationLogEntityState} from '../../../../shared/redux/states/pagination-log-entity.state';
import {LoadableLogState} from '../../../../shared/redux/states/loadable-log.state';
import {DifficultiesFilter} from '../../../../shared/filters/difficulties/difficulties.filter';
import {DetailedDifficultyWithAvailableActionsDto} from '../../../../shared/models/difficulties/detailed-difficulty-with-available-actions.dto';

export const difficultiesFeatureKey = 'difficulties';


export class State extends LoadableLogEntityState<DetailedDifficultyWithAvailableActionsDto> {
  filter: DifficultiesFilter;
  paginationResume: PaginationResume;
  canCreate = false;
}

const adapter: EntityAdapter<DetailedDifficultyWithAvailableActionsDto> = createEntityAdapter<DetailedDifficultyWithAvailableActionsDto>();
export const initialState: State = adapter.getInitialState(new State());

export const reducer = createReducer<State>(
  initialState,
  on(DifficultiesActions.updateFilter, (s, a) =>
    ({...s, filter: a.payload})
  ),
  on(DifficultiesActions.loadDifficultiesPageFiltered, state => LoadableLogEntityState.toLoadState(state, LanguagesActions.updateFilter)),
  on(DifficultiesActions.loadDifficultiesPageFilteredSuccess, (state, action) =>
    PaginationLogEntityState.onLoadPageSuccess(adapter, state, action)
  ),
  on(DifficultiesActions.loadDifficultiesPageFilteredFailure, (state, action) => LoadableLogEntityState.toLoadFailureState(state, action)),
  on(DifficultiesActions.createDifficulty, state =>
    LoadableLogState.toLoadState(state, DifficultiesActions.createDifficulty)),
  on(DifficultiesActions.createDifficultySuccess, (state) =>
    LoadableLogEntityState.toLoadSuccessState(state, DifficultiesActions.createDifficultySuccess)),
  on(DifficultiesActions.createDifficultyFailure, (state, action) =>
    LoadableLogState.toLoadFailureState(state, action)),
  on(DifficultiesActions.updateDifficulty, state =>
    LoadableLogState.toLoadState(state, DifficultiesActions.updateDifficulty)),
  on(DifficultiesActions.updateDifficultySuccess, (state, a) =>
    adapter.updateOne({id: a.payload.id, changes: a.payload}, LoadableLogEntityState.toLoadSuccessState(state, a))),
  on(DifficultiesActions.updateDifficultyFailure, (state, action) =>
    LoadableLogState.toLoadFailureState(state, action)),
  on(DifficultiesActions.deleteDifficulty, state => LoadableLogState.toLoadState(state, DifficultiesActions.deleteDifficulty)),
  on(DifficultiesActions.deleteDifficultySuccess, (state, action) => {
    return adapter.removeOne(action.payload, LoadableLogEntityState.toLoadSuccessState({...state}, DifficultiesActions.deleteDifficultySuccess));
  }),
  on(DifficultiesActions.deleteDifficultyFailure, (state, action) => LoadableLogState.toLoadFailureState(state, action)),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
