import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LanguagesRoutingModule} from './languages-routing.module';
import {LanguagesRootComponent} from './components/languages-root/languages-root.component';
import {LanguagesCreatePageComponent} from './components/languages-create-page/languages-create-page.component';
import {LanguageListPageComponent} from './components/language-list-page/language-list-page.component';
import {LanguageNavbarComponent} from './components/language-navbar/language-navbar.component';
import {SharedModule} from '../../shared/shared.module';
import {LanguagesFilterModule} from './languages-filter/languages-filter.module';
import {LanguagesLanguageComponent} from './components/languages-language/languages-language.component';
import {StoreModule} from '@ngrx/store';
import * as fromLanguages from './state/languages.reducer';
import {EffectsModule} from '@ngrx/effects';
import {LanguagesEffects} from './state/languages.effects';


@NgModule({
  declarations: [LanguagesRootComponent, LanguagesCreatePageComponent, LanguageListPageComponent, LanguageNavbarComponent, LanguagesLanguageComponent],
  imports: [
    CommonModule,
    SharedModule,
    LanguagesRoutingModule,
    LanguagesFilterModule,
    StoreModule.forFeature(fromLanguages.languagesFeatureKey, fromLanguages.reducer),
    EffectsModule.forFeature([LanguagesEffects])
  ]
})
export class LanguagesModule {
}
