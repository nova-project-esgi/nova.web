import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromEventsFilter from './state/events-filter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EventsFilterEffects } from './state/events-filter.effects';
import {LanguagesModule} from '../../../shared/states/languages/languages.module';
import {EventsFilterComponent} from './component/events-filter.component';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [EventsFilterComponent],
  exports: [EventsFilterComponent],
  imports: [
    SharedModule,
    CommonModule,
    StoreModule.forFeature(fromEventsFilter.eventsFilterFeatureKey, fromEventsFilter.reducer),
    EffectsModule.forFeature([EventsFilterEffects])
  ]
})
export class EventsFilterModule { }
