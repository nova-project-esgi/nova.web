import {createReducer, on} from '@ngrx/store';
import * as DifficultiesFilterActions from './difficulties-filter.actions';
import {LoadableLogState} from '../../../../../shared/redux/states/loadable-log.state';
import {DifficultiesFilter} from '../../../../../shared/filters/difficulties/difficulties.filter';
import {DifficultyTranslationNameDto} from '../../../../../shared/models/difficulties/difficulty-translation-name.dto';

export const difficultiesFilterFeatureKey = 'difficultiesFilter';

export class State extends LoadableLogState {
  filter: DifficultiesFilter = new DifficultiesFilter();
  names: DifficultyTranslationNameDto[] = [];
}

export const initialState: State = new State();


export const reducer = createReducer<State>(
  initialState,
  on(DifficultiesFilterActions.loadNames, state => LoadableLogState.toLoadState(state, DifficultiesFilterActions.loadNames)),
  on(DifficultiesFilterActions.updateFilter, (state, a) =>
    ({...state, filter: a.payload})
  ),
  on(DifficultiesFilterActions.loadNamesSuccess, (state, action) =>
    LoadableLogState.toLoadSuccessState({...state, names: action.payload}, DifficultiesFilterActions.loadNamesSuccess)
  ),
  on(DifficultiesFilterActions.loadNamesFailure, (state, action) =>
    LoadableLogState.toLoadFailureState(state, action)),
);

