import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TranslatedEventsTitleFilter} from '../../../../shared/filters/events/translated-events-title.filter';
import {Store} from '@ngrx/store';
import {TranslatedEventDto} from '../../../../shared/models/events/translated-event.dto';
import {EventsFilterComponent} from '../../events-filter/component/events-filter.component';
import * as fromEvents from '../../state/events.reducer';
import * as EventsSelectors from '../../state/events.selectors';
import * as EventsActions from '../../state/events.actions';
import {TranslatedEventsFilter} from '../../../../shared/filters/events/translated-events.filter';
import {Payload} from '../../../../shared/redux/payload';
import {PageEvent} from '@angular/material/paginator';
import {PaginationResume} from '../../../../shared/http/pagination/pagination-resume';
import {ImageDetailedEventDto} from '../../../../shared/models/events/image-detailed-event.dto';
import * as ResourcesActions from '../../../../shared/states/resources/resources.actions';
import {FormListEditionComponent} from '../../../../shared/components/bases/form-list-edition.component';
import {EventsEventComponent} from '../events-event/events-event.component';
import {FormBuilder} from '@angular/forms';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import * as LanguagesSelectors from '../../../../shared/states/languages/languages.selectors';
import * as LanguagesActions from '../../../../shared/states/languages/languages.actions';
import {ImageDetailedResourceDto} from '../../../../shared/models/resources/image-detailed-resource.dto';
import * as ResourcesSelectors from '../../../../shared/states/resources/resources.selectors';
import {ImageDetailedEventEdition} from '../../../../shared/models/events/image-detailed-event-edition';
import {trackById} from '../../../../shared/track-by/generic-track-by';


@Component({
  selector: 'app-events-list-page',
  templateUrl: './events-list-page.component.html',
  styles: []
})
export class EventsListPageComponent extends FormListEditionComponent< EventsEventComponent, ImageDetailedEventDto, ImageDetailedEventEdition > implements OnInit, AfterViewInit {
  @ViewChild(EventsFilterComponent)
  filterComponent: EventsFilterComponent;

  elements: ImageDetailedEventDto[] = [];
  pagination: PaginationResume;

  trackByFn = trackById;

  constructor(private store: Store<fromEvents.State>, protected fb: FormBuilder) {
    super(fb);
  }
  languages: LanguageDto[];
  resources: ImageDetailedResourceDto[];

  ngOnInit(): void {
    this.store.dispatch(ResourcesActions.loadResources());
    this.store.select(EventsSelectors.selectPaginationResume).subscribe(pagination => {
      this.pagination = pagination;
    });

    this.store.select(EventsSelectors.selectEvents).subscribe(
      events => this.elements = events);
    this.store.select(LanguagesSelectors.selectLanguages).subscribe(languages => this.languages = languages);
    this.store.dispatch(LanguagesActions.loadLanguages());
    this.store.select(ResourcesSelectors.selectResources).subscribe(resources => this.resources = resources);
    this.store.dispatch(ResourcesActions.loadResources());
  }

  onFilterReset(): void {
  }

  ngAfterViewInit(): void {
  }

  getTranslatedEvents(): void {
    this.store.dispatch(EventsActions.loadEventsPageFiltered());
  }

  updateFilter($event: TranslatedEventsTitleFilter): void {
    this.store.dispatch(EventsActions.updateFilter(new Payload<TranslatedEventsFilter>($event)));
  }

  onPageChange($event: PageEvent): void {
    this.store.dispatch(EventsActions.updatePagination(new Payload<PaginationResume>(PaginationResume.fromPageEvent($event))));
  }

  onEventUpdated(event: ImageDetailedEventEdition): void {
    this.store.dispatch(EventsActions.updateEvent(new Payload<ImageDetailedEventEdition>(event)));
  }

  onEventDeleted(eventId: ImageDetailedEventDto): void {
    this.store.dispatch(EventsActions.deleteEvent(new Payload<string>(eventId.id)));
  }
}
