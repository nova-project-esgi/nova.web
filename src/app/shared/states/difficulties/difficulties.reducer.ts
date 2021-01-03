import {createReducer, on} from '@ngrx/store';
import * as DifficultiesActions from './difficulties.actions';
import {LoadableLogEntityState} from '../../redux/states/loadable-log-entity.state';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {LoadableLogState} from '../../redux/states/loadable-log.state';
import {DetailedDifficultyDto} from '../../models/difficulties/detailed-difficulty.dto';

export const difficultiesFeatureKey = 'shared-difficulties';

export class State extends LoadableLogEntityState<DetailedDifficultyDto> {

}

const adapter: EntityAdapter<DetailedDifficultyDto> = createEntityAdapter<DetailedDifficultyDto>();

export const initialState: LoadableLogEntityState<DetailedDifficultyDto> = adapter.getInitialState(new State());


export const reducer = createReducer(
  initialState,
  on(DifficultiesActions.loadDifficulties, state => LoadableLogState.toLoadState(state, DifficultiesActions.loadDifficulties)),
  on(DifficultiesActions.loadDifficultiesSuccess, (state, action) => {
    return adapter.addMany(action.payload, LoadableLogState.toLoadSuccessState(state, DifficultiesActions.loadDifficultiesSuccess));
  }),
  on(DifficultiesActions.loadDifficultiesFailure, (state, action) => LoadableLogState.toLoadFailureState(state, action)),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();


