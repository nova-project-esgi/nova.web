import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromNotification from './notification.reducer';

export const selectNotificationState = createFeatureSelector<fromNotification.State>(
  fromNotification.notificationFeatureKey
);

export const selectNotification = createSelector(selectNotificationState, state => state.notification);
