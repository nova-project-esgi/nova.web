import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromUsersFilter from './states/users-filter/users-filter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersFilterEffects } from './states/users-filter/users-filter.effects';
import { UsersFilterComponent } from './component/users-filter/users-filter.component';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [UsersFilterComponent],
  exports: [
    UsersFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(fromUsersFilter.usersFilterFeatureKey, fromUsersFilter.reducer),
    EffectsModule.forFeature([UsersFilterEffects])
  ]
})
export class UsersFilterModule { }
