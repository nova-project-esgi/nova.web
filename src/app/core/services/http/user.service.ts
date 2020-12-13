import {Injectable} from '@angular/core';
import {ApiServiceBase} from './api-service.base';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConnectedUser} from '../../../shared/models/users/connected.user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiServiceBase {
  protected url = `${environment.apiUrl}/users`;

  constructor(protected http: HttpClient) {
    super();
  }


}
