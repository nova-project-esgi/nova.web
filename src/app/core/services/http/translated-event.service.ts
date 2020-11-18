import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiServiceBase} from './api-service.base';
import {TranslatedEventDto} from '../../../shared/models/events/translated-event.dto';
import {CustomContentTypeEnum} from '../../../shared/enums/custom-content-type.enum';
import {HeadersEnum} from '../../../shared/enums/headers.enum';
import {PaginationMetadata} from '../../../shared/pagination/pagination-metadata';
import {map, tap} from 'rxjs/operators';
import {TranslatedEventsFilter} from '../../../shared/filters/translated-events.filter';

@Injectable({
  providedIn: 'root'
})
export class TranslatedEventService extends ApiServiceBase {

  protected url = `${environment.apiUrl}/events`;

  constructor(protected http: HttpClient) {
    super();
  }

  getOne(id: string, language: string): Observable<TranslatedEventDto> {
    return this.getFiltered<TranslatedEventDto, TranslatedEventsFilter>(
      {url: `${this.url}/${id}`, filterObj: { language },  headers: this.getAcceptHeader(CustomContentTypeEnum.TRANSLATED_EVENT)})
      .pipe(
        map(event => new TranslatedEventDto(event))
      );
  }

  getPaginatedByLanguage(language: string): Observable<PaginationMetadata<TranslatedEventDto>>{
    return this.getFiltered<PaginationMetadata<TranslatedEventDto>, TranslatedEventsFilter>(
      {url: this.url, filterObj: { language },  headers: this.getAcceptHeader(CustomContentTypeEnum.TRANSLATED_EVENT)})
      .pipe(
        tap(eventPage => eventPage.values = eventPage.values.map(e => new TranslatedEventDto(e)))
      );
  }
}
