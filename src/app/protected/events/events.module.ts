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
import {EventsNavbarComponent} from './components/events-navbar/events-navbar.component';
import {EventsCreatePageComponent} from './components/events-create-page/events-create-page.component';
import {EventsEditTranslationComponent} from './components/events-edit-translation/events-edit-translation.component';
import {EventsEditTranslationsComponent} from './components/events-edit-translations/events-edit-translations.component';
import {EventsEditChoicesComponent} from './components/events-edit-choices/events-edit-choices.component';
import {EventsEditChoiceComponent} from './components/events-edit-choice/events-edit-choice.component';
import {EventsEditChoiceTranslationsComponent} from './components/events-edit-choice-translations/events-edit-choice-translations.component';
import {EventsEditChoiceTranslationComponent} from './components/events-edit-choice-translation/events-edit-choice-translation.component';
import {EventsEditChoiceResourcesComponent} from './components/events-edit-choice-resources/events-edit-choice-resources.component';
import {EventsEditChoiceResourceComponent} from './components/events-edit-choice-resource/events-edit-choice-resource.component';
import {EventsEditOptionsComponent} from './components/events-edit-options/events-edit-options.component';

@NgModule({
  declarations: [
    EventsRootComponent,
    EventsEventComponent,
    EventsListPageComponent,
    EventsNavbarComponent,
    EventsCreatePageComponent,
    EventsEditTranslationComponent,
    EventsEditTranslationsComponent,
    EventsEditChoicesComponent,
    EventsEditChoiceComponent,
    EventsEditChoiceTranslationsComponent,
    EventsEditChoiceTranslationComponent,
    EventsEditChoiceResourcesComponent,
    EventsEditChoiceResourceComponent,
    EventsEditOptionsComponent
  ],
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
