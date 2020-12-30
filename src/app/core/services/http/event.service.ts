import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {ApiServiceBase} from './api-service.base';
import {TranslatedEventDto} from '../../../shared/models/events/translated-event.dto';
import {CustomMediaTypeEnum} from '../../../shared/enums/custom-media-type.enum';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {map, switchMap, tap} from 'rxjs/operators';
import {TranslatedEventsTitleFilter} from '../../../shared/filters/events/translated-events-title.filter';
import {EventTranslationTitleDto} from '../../../shared/models/events/event-translation-title.dto';
import {PaginationWrapper} from '../../../shared/http/pagination/pagination-wrapper';
import {EventTranslationFilter} from '../../../shared/filters/events/event-translation.filter';
import {EventTranslationDto} from '../../../shared/models/events/event-translation.dto';
import {EventTranslationCreationDto} from '../../../shared/models/events/event-translation-creation.dto';
import {ImageDetailedEventEdition} from '../../../shared/models/events/image-detailed-event-edition';
import {ImageService} from './image.service';
import {ImageDetailedEventDto} from '../../../shared/models/events/image-detailed-event.dto';
import {DetailedEventDto} from '../../../shared/models/events/detailed-event.dto';
import {FileUtils} from '../../../shared/utils/file.utils';
import {ImageDetailedResourceDto} from '../../../shared/models/resources/image-detailed-resource.dto';

@Injectable({
  providedIn: 'root'
})
export class EventService extends ApiServiceBase {

  protected url = `${environment.apiUrl}/events`;

  constructor(protected http: HttpClient, protected imageService: ImageService) {
    super();
  }

  getOne(id: string, language: string): Observable<TranslatedEventDto> {
    return this.getFiltered<TranslatedEventDto, TranslatedEventsTitleFilter>(
      {url: `${this.url}/${id}`, filterObj: {language}, headers: this.getAcceptHeader(CustomMediaTypeEnum.DETAILED_EVENT)})
      .pipe(
        map(event => new TranslatedEventDto(event))
      );
  }

  getEventBackgroundById(id: string): Observable<File> {
    return this.imageService.getData(`${this.url}/${id}/background`).pipe(
      map(content => FileUtils.base64ToFile(content, `background-${id}`))
    );
  }

  getPaginatedImageDetailedEventsFiltered(paginationWrapper: PaginationWrapper<TranslatedEventsTitleFilter>,
                                          resources: ImageDetailedResourceDto[]): Observable<PaginationMetadata<ImageDetailedEventDto>> {
    return this.getPaginatedDetailedEventsFiltered(paginationWrapper).pipe(
      switchMap(page => {
        page = PaginationMetadata.fromPage(page);
        const values = page.values.map(event => event.toImageDetailedEventDto(resources));
        const backgroundPage = page.copyTo<ImageDetailedEventDto>(values);
        return forkJoin(
          of(backgroundPage),
          ...backgroundPage.values.map(
            event => this.getEventBackgroundById(event.id).pipe(
              tap(file => event.background = file)
            )));
      }),
      map(([page]) => page)
    );
  }

  getOneDetailedEventById(id: string): Observable<DetailedEventDto> {
    return this.http.get<DetailedEventDto>(`${this.url}/${id}`, {headers: this.getAcceptHeader(CustomMediaTypeEnum.DETAILED_EVENT)})
      .pipe(
        map(event => new DetailedEventDto(event))
      );
  }

  getOneImageDetailedEventById(id: string, resources: ImageDetailedResourceDto[]): Observable<ImageDetailedEventDto> {
    return this.getOneDetailedEventById(id).pipe(
      switchMap(event => forkJoin(of(event), this.getEventBackgroundById(id))),
      map(([event, background]) => {
        const imageEvent = event.toImageDetailedEventDto(resources);
        imageEvent.background = background;
        return imageEvent;
      })
    );

  }


  getPaginatedDetailedEventsFiltered(paginationWrapper: PaginationWrapper<TranslatedEventsTitleFilter>): Observable<PaginationMetadata<DetailedEventDto>> {
    return this.getFiltered<PaginationMetadata<DetailedEventDto>, TranslatedEventsTitleFilter>(
      {url: this.url, filterObj: {...paginationWrapper.content}, pagination: paginationWrapper, headers: this.getAcceptHeader(CustomMediaTypeEnum.DETAILED_EVENT)})
      .pipe(
        map(page => {
          page = PaginationMetadata.fromPage(page);
          page.values = page.values.map(v => new DetailedEventDto(v));
          return page;
        })
      );
  }

  getPaginatedEventsTitlesFiltered(filter: TranslatedEventsTitleFilter): Observable<EventTranslationTitleDto[]> {
    return this.getFiltered<PaginationMetadata<EventTranslationTitleDto>, TranslatedEventsTitleFilter>(
      {url: this.url, filterObj: {...filter}, headers: this.getAcceptHeader(CustomMediaTypeEnum.EVENT_TITLE)})
      .pipe(
        map(titlesPage => titlesPage.values.map(e => new EventTranslationTitleDto(e)))
      );
  }

  getEventTranslationsByIds(filter: EventTranslationFilter): Observable<EventTranslationDto[]> {
    return this.getFiltered<EventTranslationDto[], EventTranslationFilter>(
      {url: this.url, filterObj: {...filter}, headers: this.getAcceptHeader(CustomMediaTypeEnum.EVENT_TRANSLATION)}
    ).pipe(
      map(eventTranslations => eventTranslations.map(translation => new EventTranslationDto(translation)))
    );
  }

  createNewTranslation(translation: EventTranslationCreationDto): Observable<EventTranslationDto> {
    return this.createAndGet<EventTranslationCreationDto, EventTranslationDto>({
      url: this.url, headers: this.getContentTypeHeader(CustomMediaTypeEnum.EVENT_TRANSLATION)
    }, translation);
  }

  create(event: ImageDetailedEventEdition): Observable<string> {
    return this.createAndLocate({url: this.url, headers: this.getContentTypeHeader(CustomMediaTypeEnum.DETAILED_EVENT)}, event.toDetailedEdition()).pipe(
      switchMap(loc => this.imageService.saveFile(`${loc}/background`, event.image))
    );
  }

  update(event: ImageDetailedEventEdition, id: string, resources: ImageDetailedResourceDto[]): Observable<ImageDetailedEventDto> {
    return this.http.put(`${this.url}/${id}`, event, {headers: this.getContentTypeHeader(CustomMediaTypeEnum.DETAILED_EVENT)}).pipe(
      switchMap(res => this.getOneImageDetailedEventById(id, resources))
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
