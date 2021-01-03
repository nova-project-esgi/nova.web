
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromResources from './resources.reducer';
import * as ResourcesActions from './resources.actions';
import * as fromLanguages from '../../languages/state/languages.reducer';
import {PaginationWrapper} from '../../../shared/http/pagination/pagination-wrapper';
import {LanguageDto} from '../../../shared/models/languages/language.dto';
import * as LanguagesActions from '../../languages/state/languages.actions';
import {ImageDetailedResourceDto} from '../../../shared/models/resources/image-detailed-resource.dto';



export const selectResourcesState = createFeatureSelector<fromResources.State>(
  fromResources.resourcesFeatureKey
);
export const selectLogs = createSelector(
  selectResourcesState,
  s => s.logs
)
export const resourceCreated = createSelector(
  selectLogs,
  logs => logs.type === 'SUCCESS' && logs.message === ResourcesActions.createResourceSuccess.type
);


export const selectPaginationResume = createSelector(
  selectResourcesState,
  state => state.paginationResume
);
export const selectFilter = createSelector(
  selectResourcesState,
  state => state.filter
);
export const selectPaginationWithFilter = createSelector(
  selectPaginationResume,
  selectFilter,
  (pagination, filter) => new PaginationWrapper({page: pagination?.page, size: pagination?.size, content: filter})
);

const selectAll = createSelector(
  selectResourcesState,
  fromResources.selectAll
);
export const selectResources = createSelector(
  selectAll,
  resources => resources?.map(r => new ImageDetailedResourceDto(r)) ?? []
)

export const selectLanguageById = createSelector(
  selectResources,
  (languages: ImageDetailedResourceDto[], id: { id: string }) => languages.find(l => l.id === id.id)
);


export const selectCanCreate = createSelector(
  selectResourcesState,
  s => s.canCreate
);

export const selectIsDeleted = createSelector(
  selectResourcesState,
  s => s.logs.type === 'SUCCESS' && s.logs.message === ResourcesActions.deleteResource.type
);
