import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromEventsTranslation from './state/events-translation.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EventsTranslationEffects } from './state/events-translation.effects';
import {EventsTranslationsListComponent} from './components/events-translations-list/events-translations-list.component';
import {SharedModule} from '../../../shared/shared.module';
import { EventsTranslationComponent } from './components/events-translation/events-translation.component';



@NgModule({
  declarations: [EventsTranslationsListComponent, EventsTranslationComponent],
  exports: [
    EventsTranslationsListComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromEventsTranslation.eventsTranslationFeatureKey, fromEventsTranslation.reducer),
    EffectsModule.forFeature([EventsTranslationEffects])
  ]
})
export class EventsTranslationModule { }
