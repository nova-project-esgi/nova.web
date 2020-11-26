import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TranslatedEventService} from '../../../../core/services/http/translated-event.service';
import * as fromTranslatedEvents from './translated-events.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {TranslatedEventDto} from '../../../../shared/models/events/translated-event.dto';
import {Payload} from '../../../../shared/redux/payload';
import {TypedAction} from '@ngrx/store/src/models';
import {TranslationId} from '../../../../shared/ids/translation.id';
import {TranslatedEventsFilter} from '../../../../shared/filters/events/translated-events.filter';
import {PaginationMetadata} from '../../../../shared/http/pagination/pagination-metadata';

@Injectable()
export class TranslatedEventsEffects {
  // getOne$ = createEffect(() => this.actions$.pipe(
  //   ofType(fromTranslatedEvents.ActionTypes.GET_ONE_TRANSLATED_EVENT),
  //   switchMap((action: Payload<TranslationId<string>> & TypedAction<string>) => this.eventService.getOne(action.payload.id, action.payload.language)),
  //   map(event => fromTranslatedEvents.getOneTranslatedEventSuccess(new Payload<TranslatedEventDto>(event))),
  //   catchError(err => of(fromTranslatedEvents.getOneTranslatedEventError(err)))
  // ));
  getPaginatedTranslatedEventFiltered = createEffect(() => this.actions$.pipe(
    ofType(fromTranslatedEvents.ActionTypes.GET_PAGINATED_TRANSLATED_EVENTS_FILTERED),
    switchMap((action: Payload<TranslatedEventsFilter> & TypedAction<string>) => this.eventService.getPaginatedTranslatedEventsFiltered(action.payload)),
    map(eventsPage => fromTranslatedEvents.getPaginatedTranslatedEventsFilteredSuccess(new Payload<PaginationMetadata<TranslatedEventDto>>(eventsPage))),
    catchError(err => of(fromTranslatedEvents.getPaginatedTranslatedEventsFilteredError(err)))
  ));
  constructor(private eventService: TranslatedEventService, private actions$: Actions) {
  }

}
