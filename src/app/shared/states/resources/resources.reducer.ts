import {createReducer, on} from '@ngrx/store';
import * as ResourcesActions from './resources.actions';
import {LoadableLogEntityState} from '../../redux/states/loadable-log-entity.state';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {ImageDetailedResourceDto} from '../../models/resources/image-detailed-resource.dto';

export const resourcesFeatureKey = 'shared-resources';

export class State extends LoadableLogEntityState<ImageDetailedResourceDto> {
}

const adapter: EntityAdapter<ImageDetailedResourceDto> = createEntityAdapter<ImageDetailedResourceDto>();
export const initialState: LoadableLogEntityState<ImageDetailedResourceDto> = adapter.getInitialState(new State());


export const reducer = createReducer(
  initialState,
  on(ResourcesActions.loadResources, state => state),
  on(ResourcesActions.loadResourcesSuccess, (state, action) =>
    adapter.setAll(action.payload, LoadableLogEntityState.toLoadSuccessState(state, action))
  ),
  on(ResourcesActions.loadResourcesFailure, (state, action) =>
    LoadableLogEntityState.toLoadFailureState(state, action)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

