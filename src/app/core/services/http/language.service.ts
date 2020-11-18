import {Injectable} from '@angular/core';
import {ApiServiceBase} from './api-service.base';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LanguageDto} from '../../../shared/models/languages/language.dto';
import {map} from 'rxjs/operators';

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
}
