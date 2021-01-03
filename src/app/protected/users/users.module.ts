import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromUsers from './states/users/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './states/users/users.effects';
import { UsersRootComponent } from './components/users-root/users-root.component';
import { UsersListPageComponent } from './components/users-list-page/users-list-page.component';
import { UsersEditComponent } from './components/users-edit/users-edit.component';
import {SharedModule} from '../../shared/shared.module';
import {UsersFilterModule} from './users-filter/users-filter.module';


@NgModule({
  declarations: [UsersRootComponent, UsersListPageComponent, UsersEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    StoreModule.forFeature(fromUsers.usersFeatureKey, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
    UsersFilterModule
  ]
})
export class UsersModule { }
