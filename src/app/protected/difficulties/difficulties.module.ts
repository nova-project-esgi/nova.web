import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DifficultiesRoutingModule} from './difficulties-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromDifficulties from './states/difficulties/difficulties.reducer';
import {EffectsModule} from '@ngrx/effects';
import {DifficultiesEffects} from './states/difficulties/difficulties.effects';
import {DifficultiesCreatePageComponent} from './components/difficulties-create-page/difficulties-create-page.component';
import {DifficultiesListPageComponent} from './components/difficulties-list-page/difficulties-list-page.component';
import {DifficultiesEditTranslationComponent} from './components/difficulties-edit-translation/difficulties-edit-translation.component';
import {DifficultiesEditTranslationsComponent} from './components/difficulties-edit-translations/difficulties-edit-translations.component';
import {DifficultiesEditOptionsComponent} from './components/difficulties-edit-options/difficulties-edit-options.component';
import {DifficultiesNavbarComponent} from './components/difficulties-navbar/difficulties-navbar.component';
import {SharedModule} from '../../shared/shared.module';
import {DifficultiesDifficultyComponent} from './components/difficulties-difficulty/difficulties-difficulty.component';
import {DifficultiesRootComponent} from './components/difficulties-root/difficulties-root.component';
import {DifficultiesFilter} from '../../shared/filters/difficulties/difficulties.filter';
import {DifficultiesFilterModule} from './difficulties-filter/difficulties-filter.module';


@NgModule({
  declarations: [
    DifficultiesRootComponent,
    DifficultiesDifficultyComponent,
    DifficultiesCreatePageComponent,
    DifficultiesListPageComponent,
    DifficultiesEditTranslationComponent,
    DifficultiesEditTranslationsComponent,
    DifficultiesEditOptionsComponent,
    DifficultiesNavbarComponent
  ],
  imports: [
    CommonModule,
    DifficultiesRoutingModule,
    SharedModule,
    DifficultiesFilterModule,
    StoreModule.forFeature(fromDifficulties.difficultiesFeatureKey, fromDifficulties.reducer),
    EffectsModule.forFeature([DifficultiesEffects])
  ]
})
export class DifficultiesModule {
}
