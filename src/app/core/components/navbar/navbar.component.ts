import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectConnectedUser} from '../../state/user/user.selectors';
import {User} from '../../../shared/models/users/user';
import {logOut} from '../../state/user/user.actions';
import {sendNotification} from '../../state/notification/notification.actions';
import {Router} from '@angular/router';
import {NotificationDto} from '../../../shared/models/notifications/notification.dto';
import {NotificationType} from '../../../shared/models/notifications/notification-type';
import {Payload} from '../../../shared/redux/payload';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  user?: User;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.store.select(selectConnectedUser).subscribe(user => this.user = user);
  }

  logOut(): void {
    this.store.dispatch(logOut());
    this.router.navigate(['home']);
  }

  sendMobileUpdateNotification(): void {
    this.store.dispatch(sendNotification(new Payload<NotificationDto>(new NotificationDto({
      title: 'NOVA UPDATE',
      body: 'New amazing update is available download it now !',
      type: NotificationType.UPDATE
    }))));
  }
}
