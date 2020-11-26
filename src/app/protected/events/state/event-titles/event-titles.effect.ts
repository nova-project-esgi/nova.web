import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {Payload} from '../../../../shared/redux/payload';
import * as EventTitleAction from '../event-titles/event-titles.actions';
import {TranslatedEventService} from '../../../../core/services/http/translated-event.service';
import {EventTranslationTitleDto} from '../../../../shared/models/events/event-translation-title.dto';
import {Store} from '@ngrx/store';
import {getTitleFilter, getTranslatedEventsState} from '../events.selector';
import {EventsState} from '../index';

@Injectable()
export class EventTitleEffects {

  constructor(private eventService: TranslatedEventService, private actions$: Actions) {
  }

  // getFilteredTitles$ = createEffect(() => this.actions$.pipe(
  //   ofType(EventTitleAction.ActionTypes.GET_ALL_EVENT_TITLES_FILTERED),
  //   concatMap(action => of(action).pipe(
  //     withLatestFrom(this.store.select(getTitleFilter))
  //   )),
  //   switchMap(([filter]) => this.eventService.getPaginatedEventsTitlesFiltered(filter)),
  //   map(titles => EventTitleAction.successGetAllEventTitlesFiltered(new Payload<EventTranslationTitleDto[]>(titles))),
  //   catchError(err => of(EventTitleAction.errorGetAllEventTitlesFiltered(new Payload<HttpErrorResponse>(err))))
  // ));

}
