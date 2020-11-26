import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TranslatedEventsTitleFilter} from '../../../shared/filters/events/translated-events-title.filter';
import {Store} from '@ngrx/store';
import {LanguageDto} from '../../../shared/models/languages/language.dto';
import {selectLanguages} from '../../../shared/redux/state/languages/language.selector';
import {TranslatedEventDto} from '../../../shared/models/events/translated-event.dto';
import {Payload} from '../../../shared/redux/payload';
import {getAllEventTitlesFiltered, setEventTitlesFilter} from '../state/event-titles/event-titles.actions';
import {EventTranslationTitleDto} from '../../../shared/models/events/event-translation-title.dto';
import {getAllLanguages} from '../../../shared/redux/state/languages/language.actions';
import {EventsState} from '../state';
import {EventsFilterComponent} from '../events-filter/events-filter.component';
import {debounceTime} from 'rxjs/operators';
import {getEventFilter, getEventTitlesState, getLanguagesState, getTitleFilter, getTitles, getTranslatedEventsState} from '../state/events.selector';
import {getPaginatedTranslatedEventsFiltered, setEventsFilter} from '../state/translated-event/translated-events.actions';
import {TranslatedEventsFilter} from '../../../shared/filters/events/translated-events.filter';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styles: []
})
export class EventsPageComponent implements OnInit, AfterViewInit {
  @ViewChild(EventsFilterComponent)
  filterComponent: EventsFilterComponent;

  eventsTitleFilter: TranslatedEventsTitleFilter;
  languages: LanguageDto[];
  events: TranslatedEventDto[] = [];
  titles: EventTranslationTitleDto[];
  titlesObs: Observable<EventTranslationTitleDto[]>;

  constructor(private store: Store<EventsState>) {
  }

  ngOnInit(): void {
    // this.store.select(selectTranslatedEvent(getTranslatedEventsState)).subscribe(
    //   event => this.events.push(event));
    this.store.select(selectLanguages(getLanguagesState)).subscribe((languages) => {
      this.languages = languages;
    });
    this.titlesObs = this.store.select(getTitles);
    this.titlesObs.subscribe(titles => this.titles = titles);

    this.store.select(getTitleFilter).subscribe(filter => {
      this.eventsTitleFilter = filter;
      if (filter.language && filter.title) {
        this.store.dispatch(getAllEventTitlesFiltered());
      }
    });
    this.store.select(getEventFilter).subscribe(filter => {
      if (filter.language && filter.title) {
        this.store.dispatch(getPaginatedTranslatedEventsFiltered());
      }
    });
    this.store.dispatch(getAllLanguages());
  }

  onFilterReset(): void {

  }

  onFilterChanged(filter: TranslatedEventsTitleFilter): void {
    this.store.dispatch(setEventTitlesFilter(new Payload<TranslatedEventsTitleFilter>(filter)));
  }

  ngAfterViewInit(): void {
    this.filterComponent.filterChanged
      .pipe(
        debounceTime(500)
      )
      .subscribe(filter => this.onFilterChanged(filter));
  }

  getTranslatedEvents(): void {
    this.store.dispatch(setEventsFilter(new Payload<TranslatedEventsFilter>(this.eventsTitleFilter)));
  }
}
