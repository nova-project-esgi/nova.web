import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromLanguages from './languages.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LanguagesEffects } from './languages.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromLanguages.languagesFeatureKey, fromLanguages.reducer),
    EffectsModule.forFeature([LanguagesEffects])
  ]
})
export class LanguagesModule { }
