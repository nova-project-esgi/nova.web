import {createReducer, on} from '@ngrx/store';
import {LoadableLogState} from '../../../../shared/redux/states/loadable-log.state';
import {ResourceNameTranslationDto} from '../../../../shared/models/resources/resource-name-translation.dto';
import {ResourcesFilter} from '../../../../shared/filters/resources/resources-filter';
import * as ResourcesFilterActions from './resources-filter.actions';

export const resourcesFilterFeatureKey = 'resourcesFilter';


export class State extends LoadableLogState {
  filter: ResourcesFilter = new ResourcesFilter();
  names: ResourceNameTranslationDto[] = [];
}

export const initialState: State = new State();


export const reducer = createReducer<State>(
  initialState,
  on(ResourcesFilterActions.loadNames, state => LoadableLogState.toLoadState(state, ResourcesFilterActions.loadNames)),
  on(ResourcesFilterActions.updateFilter, (state, a) =>
    ({...state, filter: a.payload})
  ),
  on(ResourcesFilterActions.loadNamesSuccess, (state, action) =>
    LoadableLogState.toLoadSuccessState({...state, names: action.payload}, ResourcesFilterActions.loadNamesSuccess)
  ),
  on(ResourcesFilterActions.loadNamesFailure, (state, action) =>
    LoadableLogState.toLoadFailureState(state, action)),
);

