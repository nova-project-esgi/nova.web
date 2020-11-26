import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiServiceBase} from './api-service.base';
import {TranslatedEventDto} from '../../../shared/models/events/translated-event.dto';
import {CustomContentTypeEnum} from '../../../shared/enums/custom-content-type.enum';
import {HeadersEnum} from '../../../shared/enums/headers.enum';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {map, tap} from 'rxjs/operators';
import {TranslatedEventsTitleFilter} from '../../../shared/filters/events/translated-events-title.filter';
import {EventTranslationTitleDto} from '../../../shared/models/events/event-translation-title.dto';
import {TranslatedEventsFilter} from '../../../shared/filters/events/translated-events.filter';

@Injectable({
  providedIn: 'root'
})
export class TranslatedEventService extends ApiServiceBase {

  protected url = `${environment.apiUrl}/events`;

  constructor(protected http: HttpClient) {
    super();
  }

  getOne(id: string, language: string): Observable<TranslatedEventDto> {
    return this.getFiltered<TranslatedEventDto, TranslatedEventsTitleFilter>(
      {url: `${this.url}/${id}`, filterObj: { language },  headers: this.getAcceptHeader(CustomContentTypeEnum.TRANSLATED_EVENT)})
      .pipe(
        map(event => new TranslatedEventDto(event))
      );
  }

  getPaginatedTranslatedEventsFiltered(filter: TranslatedEventsFilter): Observable<PaginationMetadata<TranslatedEventDto>>{
    return this.getFiltered<PaginationMetadata<TranslatedEventDto>, TranslatedEventsFilter>(
      {url: this.url, filterObj: {...filter},   headers: this.getAcceptHeader(CustomContentTypeEnum.TRANSLATED_EVENT)});
  }

  getPaginatedEventsTitlesFiltered(filter: TranslatedEventsTitleFilter): Observable<EventTranslationTitleDto[]>{
    return this.getFiltered<PaginationMetadata<EventTranslationTitleDto>, TranslatedEventsTitleFilter>(
      {url: this.url, filterObj: {...filter},   headers: this.getAcceptHeader(CustomContentTypeEnum.EVENT_TITLE)})
      .pipe(
        map(titlesPage => titlesPage.values.map(e => new EventTranslationTitleDto(e)))
      );
  }
}
