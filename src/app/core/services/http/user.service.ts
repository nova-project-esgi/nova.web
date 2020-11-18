import {Injectable} from '@angular/core';
import {ApiServiceBase} from './api-service.base';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResumeDto} from '../../../shared/models/users/user-resume.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiServiceBase {
  protected url = `${environment.apiUrl}/users`;

  constructor(protected http: HttpClient) {
    super();
  }


  getByToken(token: string): Observable<UserResumeDto> {
    return this.http.get<UserResumeDto>(`${this.url}/${token}`);
  }
}
