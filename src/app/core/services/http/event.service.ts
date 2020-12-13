import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiServiceBase} from './api-service.base';
import {TranslatedEventDto} from '../../../shared/models/events/translated-event.dto';
import {CustomContentTypeEnum} from '../../../shared/enums/custom-content-type.enum';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {map} from 'rxjs/operators';
import {TranslatedEventsTitleFilter} from '../../../shared/filters/events/translated-events-title.filter';
import {EventTranslationTitleDto} from '../../../shared/models/events/event-translation-title.dto';
import {PaginationWrapper} from '../../../shared/http/pagination/pagination-wrapper';
import {EventTranslationFilter} from '../../../shared/filters/events/event-translation.filter';
import {EventTranslationDto} from '../../../shared/models/events/event-translation.dto';
import {EventTranslationCreationDto} from '../../../shared/models/events/event-translation-creation.dto';

@Injectable({
  providedIn: 'root'
})
export class EventService extends ApiServiceBase {

  protected url = `${environment.apiUrl}/events`;

  constructor(protected http: HttpClient) {
    super();
  }

  getOne(id: string, language: string): Observable<TranslatedEventDto> {
    return this.getFiltered<TranslatedEventDto, TranslatedEventsTitleFilter>(
      {url: `${this.url}/${id}`, filterObj: {language}, headers: this.getAcceptHeader(CustomContentTypeEnum.TRANSLATED_EVENT)})
      .pipe(
        map(event => new TranslatedEventDto(event))
      );
  }

  getPaginatedTranslatedEventsFiltered(paginationWrapper: PaginationWrapper<TranslatedEventsTitleFilter>): Observable<PaginationMetadata<TranslatedEventDto>> {
    return this.getFiltered<PaginationMetadata<TranslatedEventDto>, TranslatedEventsTitleFilter>(
      {url: this.url, filterObj: {...paginationWrapper.content}, pagination: paginationWrapper, headers: this.getAcceptHeader(CustomContentTypeEnum.TRANSLATED_EVENT)});
  }

  getPaginatedEventsTitlesFiltered(filter: TranslatedEventsTitleFilter): Observable<EventTranslationTitleDto[]> {
    return this.getFiltered<PaginationMetadata<EventTranslationTitleDto>, TranslatedEventsTitleFilter>(
      {url: this.url, filterObj: {...filter}, headers: this.getAcceptHeader(CustomContentTypeEnum.EVENT_TITLE)})
      .pipe(
        map(titlesPage => titlesPage.values.map(e => new EventTranslationTitleDto(e)))
      );
  }

  getEventTranslationsByIds(filter: EventTranslationFilter): Observable<EventTranslationDto[]> {
    return this.getFiltered<EventTranslationDto[], EventTranslationFilter>(
      {url: this.url, filterObj: {...filter}, headers: this.getAcceptHeader(CustomContentTypeEnum.EVENT_TRANSLATION)}
    ).pipe(
      map(eventTranslations => eventTranslations.map(translation => new EventTranslationDto(translation)))
    );
  }

  createNewTranslation(translation: EventTranslationCreationDto): Observable<EventTranslationDto> {
    return this.createAndGet<EventTranslationCreationDto, EventTranslationDto>({
      url: this.url, headers: this.getContentTypeHeader(CustomContentTypeEnum.EVENT_TRANSLATION)}, translation);
  }
}
