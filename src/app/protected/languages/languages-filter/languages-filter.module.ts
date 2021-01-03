import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromLanguagesFilter from './state/languages-filter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LanguagesFilterEffects } from './state/languages-filter.effects';
import {LanguagesFilterComponent} from './components/languages-filter/languages-filter.component';
import {SharedModule} from '../../../shared/shared.module';
import {LanguagesModule} from '../../../shared/states/languages/languages.module';



@NgModule({
  declarations: [LanguagesFilterComponent],
  exports: [
    LanguagesFilterComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromLanguagesFilter.languagesFilterFeatureKey, fromLanguagesFilter.reducer),
    EffectsModule.forFeature([LanguagesFilterEffects])
  ]
})
export class LanguagesFilterModule { }
