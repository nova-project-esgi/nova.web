import { NgModule } from '@angular/core';
import { ResourcesFilterComponent } from './components/resources-filter/resources-filter.component';
import { StoreModule } from '@ngrx/store';
import * as fromResourcesFilter from './state/resources-filter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ResourcesFilterEffects } from './state/resources-filter.effects';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [ResourcesFilterComponent],
  exports: [
    ResourcesFilterComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromResourcesFilter.resourcesFilterFeatureKey, fromResourcesFilter.reducer),
    EffectsModule.forFeature([ResourcesFilterEffects])
  ]
})
export class ResourcesFilterModule { }
