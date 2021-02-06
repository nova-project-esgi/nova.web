import { Injectable } from '@angular/core';
import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as NotificationActions from './notification.actions';
import {Payload} from '../../../shared/redux/payload';
import {LanguageEditionDto} from '../../../shared/models/languages/language-edition.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationsService} from '../../services/http/notifications.service';
import {NotificationDto} from '../../../shared/models/notifications/notification.dto';



@Injectable()
export class NotificationEffects {

  sendNotification$ = createEffect(() => this.actions$.pipe(
    ofType(NotificationActions.sendNotification.type),
    switchMap((action: Payload<NotificationDto>) => this.notificationsService.sendNotification(action.payload).pipe(
      map(language => NotificationActions.sendNotificationSuccess(new Payload<NotificationDto>(action.payload))),
      catchError(err => of(NotificationActions.sendNotificationFailure(new Payload<HttpErrorResponse>(err))))
    )),
  ));
  constructor(private actions$: Actions, private notificationsService: NotificationsService) {}
}
