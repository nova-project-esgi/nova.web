import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromDifficultiesFilter from './states/difficulties-filter/difficulties-filter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DifficultiesFilterEffects } from './states/difficulties-filter/difficulties-filter.effects';
import {SharedModule} from '../../../shared/shared.module';
import { DifficultiesFilterComponent } from './component/difficulties-filter/difficulties-filter.component';



@NgModule({
  declarations: [DifficultiesFilterComponent],
  exports: [DifficultiesFilterComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(fromDifficultiesFilter.difficultiesFilterFeatureKey, fromDifficultiesFilter.reducer),
    EffectsModule.forFeature([DifficultiesFilterEffects])
  ]
})
export class DifficultiesFilterModule { }
