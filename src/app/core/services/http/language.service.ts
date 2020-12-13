import {Injectable} from '@angular/core';
import {ApiServiceBase} from './api-service.base';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LanguageDto} from '../../../shared/models/languages/language.dto';
import {map} from 'rxjs/operators';
import {LanguageEditionDto} from '../../../shared/models/languages/language-edition.dto';
import {PaginationWrapper} from '../../../shared/http/pagination/pagination-wrapper';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {LanguagesFilter} from '../../../shared/filters/languages/languages.filter';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends ApiServiceBase {
  protected url = `${environment.apiUrl}/languages`;

  constructor(protected http: HttpClient) {
    super();
  }

  getAll(): Observable<LanguageDto[]> {
    return this.fetchAll<LanguageDto>({
      url: this.url
    }, [])
      .pipe(
        map(languages => languages.map(l => new LanguageDto(l)))
      );
  }

  create(language: LanguageEditionDto): Observable<any> {
    return this.http.post(this.url, language);
  }

  update(language: LanguageDto): Observable<any> {
    return this.http.put(`${this.url}/${language.id}`, language);
  }

  getPaginatedLanguagesFiltered(paginationWrapper: PaginationWrapper<LanguagesFilter>): Observable<PaginationMetadata<LanguageDto>> {
    return this.getFiltered<PaginationMetadata<LanguageDto>, LanguagesFilter>(
      {url: this.url, filterObj: {...paginationWrapper.content}, pagination: paginationWrapper});

  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
