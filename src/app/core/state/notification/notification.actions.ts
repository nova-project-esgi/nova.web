import {createAction, props} from '@ngrx/store';
import {Payload} from '../../../shared/redux/payload';
import {NotificationDto} from '../../../shared/models/notifications/notification.dto';
import {HttpErrorResponse} from '@angular/common/http';

export const sendNotification = createAction(
  '[Notification] Send Notification',  props<Payload<NotificationDto>>()
);

export const sendNotificationSuccess = createAction(
  '[Notification] Send Notification Success',
  props<Payload<NotificationDto>>()
);

export const sendNotificationFailure = createAction(
  '[Notification] Send Notification Failure',
  props<Payload<HttpErrorResponse>>()
);

