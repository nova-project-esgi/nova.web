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


@Component({
  selector: 'app-events-list-page',
  templateUrl: './events-list-page.component.html',
  styles: []
})
export class EventsListPageComponent implements OnInit, AfterViewInit {
  @ViewChild(EventsFilterComponent)
  filterComponent: EventsFilterComponent;

  events: TranslatedEventDto[] = [];
  pagination: PaginationResume;

  constructor(private store: Store<fromEvents.State>) {
  }

  ngOnInit(): void {
    this.store.select(EventsSelectors.selectPaginationResume).subscribe(pagination => {
      this.pagination = pagination;
    });

    this.store.select(EventsSelectors.selectEvents).subscribe(
      events => this.events = events);
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
}
