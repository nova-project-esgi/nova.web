import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromResources from './resources.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ResourcesEffects } from './resources.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromResources.resourcesFeatureKey, fromResources.reducer),
    EffectsModule.forFeature([ResourcesEffects])
  ]
})
export class ResourcesModule { }
