import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromResources from './resources.reducer';
import * as fromLanguages from '../languages/languages.reducer';
import {LanguageDto} from '../../models/languages/language.dto';
import {ImageDetailedResourceDto} from '../../models/resources/image-detailed-resource.dto';

export const selectResourcesState = createFeatureSelector<fromResources.State>(
  fromResources.resourcesFeatureKey
);
export const selectResources = createSelector(selectResourcesState, fromResources.selectAll);
export const selectAll = createSelector(selectResources, resources => resources?.map(l => new ImageDetailedResourceDto(l)));
