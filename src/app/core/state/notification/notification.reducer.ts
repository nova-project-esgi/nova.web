import {createReducer, on} from '@ngrx/store';
import * as NotificationActions from './notification.actions';
import {LoadableLogEntityState} from '../../../shared/redux/states/loadable-log-entity.state';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {NotificationDto} from '../../../shared/models/notifications/notification.dto';
import {LoadableLogState} from '../../../shared/redux/states/loadable-log.state';

export const notificationFeatureKey = 'notification';

export class State extends LoadableLogEntityState<NotificationDto> {
  notification: NotificationDto = null;
}

const adapter: EntityAdapter<NotificationDto> = createEntityAdapter<NotificationDto>();

export const initialState: LoadableLogEntityState<NotificationDto> = adapter.getInitialState(new State());

export const reducer = createReducer(
  initialState,
  on(NotificationActions.sendNotification, state => LoadableLogState.toLoadState(state, NotificationActions.sendNotification)),
  on(NotificationActions.sendNotificationSuccess, (state, action) => {
    return LoadableLogState.toLoadSuccessState(state, NotificationActions.sendNotificationSuccess);
  }),
  on(NotificationActions.sendNotificationFailure, (state, action) => LoadableLogState.toLoadFailureState(state, action)),
);
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
