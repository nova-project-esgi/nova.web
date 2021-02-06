import * as _ from 'lodash';
import {NotificationType} from './notification-type';

export class NotificationDto {

  title: string;
  body: string;
  type: NotificationType;

  constructor(props: Partial<NotificationDto>) {
    _.assign(this, props);
  }

}
