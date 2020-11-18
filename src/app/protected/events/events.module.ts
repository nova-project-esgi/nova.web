import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventsRoutingModule} from './events-routing.module';
import {EventsRootComponent} from './events-root/events-root.component';
import {EventsPageComponent} from './events-page/events-page.component';
import {EventsFilterComponent} from './events-filter/events-filter.component';
import {SharedModule} from '../../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {effects, featureKey, reducers} from './state'

@NgModule({
  declarations: [EventsRootComponent, EventsPageComponent, EventsFilterComponent],
  imports: [
    StoreModule.forFeature(featureKey, reducers),
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    EffectsModule.forFeature(effects)
  ]
})
export class EventsModule {
}
