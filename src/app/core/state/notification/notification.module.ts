import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromNotification from './notification.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './notification.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromNotification.notificationFeatureKey, fromNotification.reducer),
    EffectsModule.forFeature([NotificationEffects])
  ]
})
export class NotificationModule { }
