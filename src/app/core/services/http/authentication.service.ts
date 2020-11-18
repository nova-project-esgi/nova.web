import {Injectable} from '@angular/core';
import {ApiServiceBase} from './api-service.base';
import {environment} from '../../../../environments/environment';
import {UserRegisterCmdDto} from '../../../shared/models/users/user-register-cmd.dto';
import {Observable} from 'rxjs';
import {UserLoginCmdDto} from '../../../shared/models/users/user-login-cmd.dto';
import {HttpClient} from '@angular/common/http';
import {UserResumeDto} from '../../../shared/models/users/user-resume.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ApiServiceBase {
  protected url = `${environment.apiUrl}/auth`;

  constructor(protected http: HttpClient) {
    super();
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  login(user: UserLoginCmdDto): Observable<UserResumeDto> {
    return this.http.post<UserResumeDto>(`${this.url}/login`, user);
  }

  register(user: UserRegisterCmdDto): Observable<UserResumeDto> {
    return this.http.post<UserResumeDto>(`${this.url}/register`, user);
  }


}
