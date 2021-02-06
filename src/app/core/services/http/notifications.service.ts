import {Injectable} from '@angular/core';
import {ApiServiceBase} from './api-service.base';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationDto} from '../../../shared/models/notifications/notification.dto';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends ApiServiceBase {
  protected url = `${environment.apiUrl}/notifications`;

  constructor(protected http: HttpClient) {
    super();
  }

  public sendNotification(notification: NotificationDto): Observable<any> {
    return this.http.post(this.url, notification);
  }
}
