import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromDifficulties from './difficulties.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DifficultiesEffects } from './difficulties.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromDifficulties.difficultiesFeatureKey, fromDifficulties.reducer),
    EffectsModule.forFeature([DifficultiesEffects])
  ]
})
export class DifficultiesModule { }
