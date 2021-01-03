import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, withLatestFrom, switchMap} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as EventsActions from './events.actions';
import * as fromEvents from './events.reducer';
import * as EventsSelectors from './events.selectors';
import * as ResourceSelectors from '../../../shared/states/resources/resources.selectors';

import {Payload} from '../../../shared/redux/payload';
import {EventTranslationTitleDto} from '../../../shared/models/events/event-translation-title.dto';
import {EventService} from '../../../core/services/http/event.service';
import {Store} from '@ngrx/store';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {TranslatedEventDto} from '../../../shared/models/events/translated-event.dto';
import {HttpErrorResponse} from '@angular/common/http';
import * as ResourcesActions from '../../resources/state/resources.actions';
import {ImageDetailedEventDto} from '../../../shared/models/events/image-detailed-event.dto';



@Injectable()
export class EventsEffects {

  loadEventsFiltered = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.loadEventsPageFiltered),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(EventsSelectors.selectPaginationWithFilter), this.store.select(ResourceSelectors.selectResources)),
      )),
      switchMap(([action, paginationWrapper, resources]) => this.eventService.getPaginatedImageDetailedEventsFiltered(paginationWrapper, resources).pipe(
        map(page => EventsActions.loadEventsPageFilteredSuccess(new Payload<PaginationMetadata<ImageDetailedEventDto>>(page))),
        catchError(err => of(EventsActions.loadEventsPageFilteredFailure(new Payload<HttpErrorResponse>(err))))
      )),
    );
  });

  createEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.createEvent),
      switchMap(action => this.eventService.create(action.payload).pipe(
        map(res => EventsActions.createEventSuccess()),
        catchError(err => of(EventsActions.createEventFailure(new Payload<HttpErrorResponse>(err))))
      ))
    );
  });

  deleteEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.deleteEvent),
      switchMap(action => this.eventService.delete(action.payload).pipe(
        map(res => EventsActions.deleteEventSuccess(action)),
        catchError(err => of(EventsActions.deleteEventFailure(new Payload<HttpErrorResponse>(err))))
      ))
    );
  });

  updateEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.updateEvent),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(ResourceSelectors.selectResources)),
      )),
      switchMap(([action, resources]) => this.eventService.update(action.payload, action.payload.id, resources).pipe(
        map(event => EventsActions.updateEventSuccess(new Payload<ImageDetailedEventDto>(event))),
        catchError(err => of(EventsActions.updateEventFailure(new Payload<HttpErrorResponse>(err))))
      ))
    );
  });




  constructor(private actions$: Actions, private eventService: EventService, private store: Store<fromEvents.State> ) {}

}
