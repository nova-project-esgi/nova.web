import {NgModule} from '@angular/core';

import {ResourcesRoutingModule} from './resources-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromResources from './state/resources.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ResourcesEffects} from './state/resources.effects';
import {ResourcesRootComponent} from './components/resources-root/resources-root.component';
import {ResourcesResourceComponent} from './components/resources-resource/resources-resource.component';
import {ResourcesNavbarComponent} from './components/resources-navbar/resources-navbar.component';
import {ResourcesCreatePageComponent} from './components/resources-create-page/resources-create-page.component';
import {ResourcesListPageComponent} from './components/resources-list-page/resources-list-page.component';
import {SharedModule} from '../../shared/shared.module';
import {ResourcesFilterModule} from './resources-filter/resources-filter.module';
import {ResourcesEditTranslationComponent} from './components/resources-edit-translation/resources-edit-translation.component';
import {ResourcesEditTranslationsComponent} from './components/resources-edit-translations/resources-edit-translations.component';
import { ResourcesEditDifficultyComponent } from './components/resources-edit-difficulty/resources-edit-difficulty.component';
import { ResourcesEditDifficultiesComponent } from './components/resources-edit-difficulties/resources-edit-difficulties.component';


@NgModule({
  declarations: [
    ResourcesRootComponent,
    ResourcesResourceComponent,
    ResourcesNavbarComponent,
    ResourcesCreatePageComponent,
    ResourcesListPageComponent,
    ResourcesEditTranslationComponent,
    ResourcesEditTranslationsComponent,
    ResourcesEditDifficultyComponent,
    ResourcesEditDifficultiesComponent
  ],
  imports: [
    ResourcesFilterModule,
    SharedModule,
    ResourcesRoutingModule,
    StoreModule.forFeature(fromResources.resourcesFeatureKey, fromResources.reducer),
    EffectsModule.forFeature([ResourcesEffects]),
  ]
})
export class ResourcesModule {
}
