import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TranslatedEventService} from '../../../core/services/http/translated-event.service';
import * as fromTranslatedEvents from './translated-events.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {TranslatedEventDto} from '../../models/events/translated-event.dto';
import {Payload} from '../../redux/payload';
import {TypedAction} from '@ngrx/store/src/models';
import {TranslationId} from '../../ids/translation.id';

@Injectable()
export class TranslatedEventsEffects {
  getOne$ = createEffect(() => this.actions$.pipe(
    ofType(fromTranslatedEvents.ActionTypes.GET_ONE_TRANSLATED_EVENT),
    switchMap((action: Payload<TranslationId<string>> & TypedAction<string>) => this.eventService.getOne(action.payload.id, action.payload.language)),
    map(event => fromTranslatedEvents.getOneTranslatedEventSuccess(new Payload<TranslatedEventDto>(event))),
    catchError(err => of(fromTranslatedEvents.getOneTranslatedEventError(err)))
  ));

  constructor(private eventService: TranslatedEventService, private actions$: Actions) {
  }

}
