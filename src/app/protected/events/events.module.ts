import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventsRoutingModule} from './events-routing.module';
import {EventsRootComponent} from './components/events-root/events-root.component';
import {EventsListPageComponent} from './components/events-list-page/events-list-page.component';
import {SharedModule} from '../../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {EventsEventComponent} from './components/events-event/events-event.component';
import {EventsFilterModule} from './events-filter/events-filter.module';
import * as fromEvents from './state/events.reducer';
import {EventsEffects} from './state/events.effects';
import {EventsTranslationModule} from './events-translations/events-translation.module';
import { EventsNavbarComponent } from './components/events-navbar/events-navbar.component';
import {EventsCreatePageComponent} from './components/events-create-page/events-create-page.component';

@NgModule({
  declarations: [EventsRootComponent, EventsEventComponent, EventsListPageComponent, EventsNavbarComponent, EventsCreatePageComponent],
  imports: [
    CommonModule,
    EventsFilterModule,
    EventsRoutingModule,
    SharedModule,
    EffectsModule.forFeature([EventsEffects]),
    StoreModule.forFeature(fromEvents.eventsFeatureKey, fromEvents.reducer),
    EventsTranslationModule
  ]
})
export class EventsModule {
}
