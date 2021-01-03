import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as EventsTranslationActions from './events-translation.actions';
import {EventService} from '../../../../core/services/http/event.service';
import {EventTranslationDto} from '../../../../shared/models/events/event-translation.dto';
import {Payload} from '../../../../shared/redux/payload';
import {HttpErrorResponse} from '@angular/common/http';


@Injectable()
export class EventsTranslationEffects {

  loadEventsTranslationsByIds$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsTranslationActions.loadEventsTranslationsByIds),
      switchMap((action) => this.eventService.getEventTranslationsByIds(action.payload)
        .pipe(
          map(translations => EventsTranslationActions.loadEventsTranslationsByIdsSuccess(new Payload<EventTranslationDto[]>(translations))),
          catchError(err => of(EventsTranslationActions.loadEventsTranslationsByIdsFailure(new Payload<HttpErrorResponse>(err))))
        )
      )
    );
  });

  createEventTranslation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsTranslationActions.createNewTranslation),
      switchMap(action => this.eventService.createNewTranslation(action.payload)
        .pipe(
          map(translation => EventsTranslationActions.createNewTranslationSuccess(new Payload<EventTranslationDto>(translation))),
          catchError(err => of(EventsTranslationActions.createNewTranslationFailure(new Payload<HttpErrorResponse>(err))))
        ))
    );
  });

  constructor(private actions$: Actions, private eventService: EventService) {
  }

}
