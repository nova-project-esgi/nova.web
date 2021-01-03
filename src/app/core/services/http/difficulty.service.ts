import {Injectable} from '@angular/core';
import {ApiServiceBase} from './api-service.base';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomMediaTypeEnum} from '../../../shared/enums/custom-media-type.enum';
import {map, switchMap} from 'rxjs/operators';
import {ResourcesFilter} from '../../../shared/filters/resources/resources-filter';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {PaginationWrapper} from '../../../shared/http/pagination/pagination-wrapper';
import {DifficultyTranslationNameDto} from '../../../shared/models/difficulties/difficulty-translation-name.dto';
import {DifficultiesFilter} from '../../../shared/filters/difficulties/difficulties.filter';
import {DetailedDifficultyWithAvailableActionsDto} from '../../../shared/models/difficulties/detailed-difficulty-with-available-actions.dto';
import {DetailedDifficultyEdition} from '../../../shared/models/difficulties/detailed-difficulty-edition';
import {DetailedDifficultyDto} from '../../../shared/models/difficulties/detailed-difficulty.dto';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService extends ApiServiceBase {
  protected url = `${environment.apiUrl}/difficulties`;

  constructor(protected http: HttpClient) {
    super();
  }

  create(difficulty: DetailedDifficultyEdition): Observable<any> {
    return this.createAndLocate({
      url: this.url,
      headers: this.getContentTypeHeader(CustomMediaTypeEnum.DETAILED_DIFFICULTY)
    }, difficulty);
  }

  getOneDetailedDifficultyById(id: string): Observable<DetailedDifficultyWithAvailableActionsDto> {
    return this.http.get(`${this.url}/${id}`, {headers: this.getAcceptHeader(CustomMediaTypeEnum.DETAILED_DIFFICULTY_WITH_AVAILABLE_ACTIONS)}).pipe(
      map(difficulty => new DetailedDifficultyWithAvailableActionsDto(difficulty))
    );
  }

  getPaginatedDifficultyNamesFiltered(filter: ResourcesFilter): Observable<DifficultyTranslationNameDto[]> {
    return this.getFiltered<PaginationMetadata<DifficultyTranslationNameDto>, ResourcesFilter>({
      url: this.url,
      filterObj: filter,
      headers: this.getAcceptHeader(CustomMediaTypeEnum.DIFFICULTY_NAME)
    }).pipe(
      map(page => page.values.map(d => new DifficultyTranslationNameDto(d)))
    );
  }


  getPaginatedDetailedDifficultiesFiltered(paginationWrapper: PaginationWrapper<DifficultiesFilter>): Observable<PaginationMetadata<DetailedDifficultyWithAvailableActionsDto>> {
    return this.getFiltered<PaginationMetadata<DetailedDifficultyWithAvailableActionsDto>, DifficultiesFilter>(
      {
        url: this.url,
        filterObj: {...paginationWrapper.content},
        pagination: paginationWrapper,
        headers: this.getAcceptHeader(CustomMediaTypeEnum.DETAILED_DIFFICULTY_WITH_AVAILABLE_ACTIONS)
      }).pipe(
      map(page => new PaginationMetadata<DetailedDifficultyWithAvailableActionsDto>(
        page.values.map(d => new DetailedDifficultyWithAvailableActionsDto(d)),
        page.links,
        page.total
      ))
    );
  }


  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  update(resource: DetailedDifficultyEdition, id: string): Observable<DetailedDifficultyWithAvailableActionsDto> {
    return this.http
      .put(`${this.url}/${id}`, resource, {headers: this.getContentTypeHeader(CustomMediaTypeEnum.DETAILED_DIFFICULTY)}).pipe(
        switchMap(res => this.getOneDetailedDifficultyById(id))
      );
  }

  getAllDetailed(): Observable<DetailedDifficultyDto[]> {
    return this.fetchAll<DetailedDifficultyDto>({
      url: this.url
    }, [])
      .pipe(
        map(difficulties => difficulties.map(d => new DetailedDifficultyDto(d)))
      );
  }
}
