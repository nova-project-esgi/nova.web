import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './user.effects';
import * as fromUsers from './user.reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUsers.userFeatureKey, fromUsers.reducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule {
}
