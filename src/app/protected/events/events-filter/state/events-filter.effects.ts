import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

import * as EventsFilterActions from './events-filter.actions';
import * as EventsFilterSelectors from './events-filter.selectors';
import * as fromEventsFilter from './events-filter.reducer';
import {Payload} from '../../../../shared/redux/payload';
import {EventService} from '../../../../core/services/http/event.service';
import {EventTranslationTitleDto} from '../../../../shared/models/events/event-translation-title.dto';
import {Store} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';


@Injectable()
export class EventsFilterEffects {


  loadTitles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsFilterActions.loadTitles),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(EventsFilterSelectors.selectFilter))
      )),
      switchMap(([action, filter]) => this.eventService.getPaginatedEventsTitlesFiltered(filter).pipe(
        map(titles => EventsFilterActions.loadTitlesSuccess(new Payload<EventTranslationTitleDto[]>(titles))),
        catchError(err => of(EventsFilterActions.loadTitlesFailure(new Payload<HttpErrorResponse>(err))))
      )),
    );
  });


  constructor(private actions$: Actions, private eventService: EventService, private store: Store<fromEventsFilter.State>) {
  }

}
