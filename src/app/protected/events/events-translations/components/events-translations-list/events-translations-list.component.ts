import {Component, Input, OnInit} from '@angular/core';
import * as fromEventTranslations from '../../state/events-translation.reducer';
import * as EventTranslationsSelectors from '../../state/events-translation.selectors';
import * as EventTranslationsActions from '../../state/events-translation.actions';
import {Store} from '@ngrx/store';
import {EventTranslationFilter} from '../../../../../shared/filters/events/event-translation.filter';
import {Payload} from '../../../../../shared/redux/payload';
import {EventTranslationDto} from '../../../../../shared/models/events/event-translation.dto';
import {EventTranslationCreationDto} from '../../../../../shared/models/events/event-translation-creation.dto';

@Component({
  selector: 'app-events-translations-list',
  templateUrl: './events-translations-list.component.html',
  styles: []
})
export class EventsTranslationsListComponent implements OnInit {

  @Input() languageIds: string[];
  @Input() eventId: string;

  translations: EventTranslationDto[] = [];

  constructor(private store: Store<fromEventTranslations.State>) {
  }

  ngOnInit(): void {
    this.store.select(EventTranslationsSelectors.selectAllTranslations).subscribe(test => console.log(test));
    if (this.languageIds?.length > 0) {
      this.store
        .select(EventTranslationsSelectors.selectTranslationsByIds, new Payload<string[]>(this.languageIds))
        .subscribe(translations => {
          this.translations = translations;
          if (translations.length === 0) {
            this.store.dispatch(EventTranslationsActions.loadEventsTranslationsByIds(new Payload<EventTranslationFilter>(new EventTranslationFilter({ids: this.languageIds}))));
          }
        });
    }

  }


  updateTranslation(translation: EventTranslationDto): void {

  }

  createTranslation(translation: EventTranslationCreationDto): void {
    translation.eventId = this.eventId;
    this.store.dispatch(EventTranslationsActions.createNewTranslation(new Payload<EventTranslationCreationDto>(translation)));
  }
}
