import {createReducer, on} from '@ngrx/store';
import * as ResourcesActions from './resources.actions';
import {LoadableLogEntityState} from '../../../shared/redux/states/loadable-log-entity.state';
import {LanguagesFilter} from '../../../shared/filters/languages/languages.filter';
import {PaginationResume} from '../../../shared/http/pagination/pagination-resume';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {ImageDetailedResourceDto} from '../../../shared/models/resources/image-detailed-resource.dto';
import {LoadableLogState} from '../../../shared/redux/states/loadable-log.state';
import {ResourcesFilter} from '../../../shared/filters/resources/resources-filter';
import * as LanguagesActions from '../../languages/state/languages.actions';
import {PaginationLogEntityState} from '../../../shared/redux/states/pagination-log-entity.state';

export const resourcesFeatureKey = 'resources';


export class State extends LoadableLogEntityState<ImageDetailedResourceDto> {
  filter: ResourcesFilter;
  paginationResume: PaginationResume;
  canCreate = false;
}

const adapter: EntityAdapter<ImageDetailedResourceDto> = createEntityAdapter<ImageDetailedResourceDto>();
export const initialState: State = adapter.getInitialState(new State());

export const reducer = createReducer<State>(
  initialState,
  on(ResourcesActions.updateFilter, (s, a) =>
    ({...s,  filter: a.payload})
  ),

  on(ResourcesActions.loadResourcesPageFiltered, state => LoadableLogEntityState.toLoadState(state, LanguagesActions.updateFilter)),
  on(ResourcesActions.loadResourcesPageFilteredSuccess, (state, action) =>
    PaginationLogEntityState.onLoadPageSuccess(adapter, state, action)
  ),
  on(ResourcesActions.loadResourcesPageFilteredFailure, (state, action) => LoadableLogEntityState.toLoadFailureState(state, action)),
  on(ResourcesActions.createResource, state =>
    LoadableLogState.toLoadState(state, ResourcesActions.createResource)),
  on(ResourcesActions.createResourceSuccess, (state) =>
    LoadableLogEntityState.toLoadSuccessState(state, ResourcesActions.createResourceSuccess)),
  on(ResourcesActions.createResourceFailure, (state, action) =>
    LoadableLogState.toLoadFailureState(state, action)),
  on(ResourcesActions.updateResource, state =>
    LoadableLogState.toLoadState(state, ResourcesActions.updateResource)),
  on(ResourcesActions.updateResourceSuccess, (state, a) =>
      adapter.updateOne({id: a.payload.id, changes: a.payload}, LoadableLogEntityState.toLoadSuccessState(state, a))),
  on(ResourcesActions.updateResourceFailure, (state, action) =>
      LoadableLogState.toLoadFailureState(state, action)),
  on(ResourcesActions.deleteResource, state => LoadableLogState.toLoadState(state, ResourcesActions.deleteResource)),
  on(ResourcesActions.deleteResourceSuccess, (state, action) => {
    return adapter.removeOne(action.payload, LoadableLogEntityState.toLoadSuccessState({...state}, ResourcesActions.deleteResourceSuccess));
  }),
  on(ResourcesActions.deleteResourceFailure, (state, action) => LoadableLogState.toLoadFailureState(state, action)),


);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
