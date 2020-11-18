import {Component, OnInit} from '@angular/core';
import {TranslatedEventsFilter} from '../../../shared/filters/translated-events.filter';
import {Store} from '@ngrx/store';
import {LanguageDto} from '../../../shared/models/languages/language.dto';
import {selectLanguages} from '../../../shared/state/languages/language.selector';
import {getAllLanguages} from '../../../shared/state/languages/language.actions';
import {TranslatedEventDto} from '../../../shared/models/events/translated-event.dto';
import {selectTranslatedEvent} from '../../../shared/state/translated-event/translated-events.selector';
import {EventsState} from '../state';
import {getLanguagesState, getTranslatedEventsState} from '../state/events.selector';
import {getAllTranslatedEvents} from '../../../shared/state/translated-event/translated-events.actions';
import {Payload} from '../../../shared/redux/payload';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styles: []
})
export class EventsPageComponent implements OnInit {
  eventFilter: TranslatedEventsFilter = {};
  languages: LanguageDto[];
  eventTitles: string[];
  events: TranslatedEventDto[] = [];

  constructor(private store: Store<EventsState>) {
  }

  ngOnInit(): void {
    this.store.select(selectTranslatedEvent(getTranslatedEventsState)).subscribe(
      event => this.events.push(event));
    this.store.select(selectLanguages(getLanguagesState)).subscribe((languages) => {
      this.languages = languages;
    });
    this.store.dispatch(getAllLanguages());
  }

  onFilterReset(): void {

  }

  onFilterChanged(filter: TranslatedEventsFilter): void {
    this.store.dispatch(getAllTranslatedEvents(new Payload<TranslatedEventsFilter>(filter)));
  }
}
