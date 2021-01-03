import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEventsTranslation from './events-translation.reducer';
import {Payload} from '../../../../shared/redux/payload';
import {EventTranslationFilter} from '../../../../shared/filters/events/event-translation.filter';

export const selectEventsTranslationState = createFeatureSelector<fromEventsTranslation.State>(
  fromEventsTranslation.eventsTranslationFeatureKey
);

export const selectAllTranslations = createSelector(
  selectEventsTranslationState,
  fromEventsTranslation.selectAll
);

export const selectTranslationsByIds = createSelector(
  selectAllTranslations,
  (translations, props: Payload<string[]>) => translations?.filter(t => props.payload.some(id => id === t.id))
);

