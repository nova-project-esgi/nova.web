import {Injectable} from '@angular/core';
import {ApiServiceBase} from './api-service.base';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsersFilter} from '../../../shared/filters/users/users-filter';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {CustomMediaTypeEnum} from '../../../shared/enums/custom-media-type.enum';
import {map} from 'rxjs/operators';
import {UserUsernameDto} from '../../../shared/models/users/user-username.dto';
import {PaginationWrapper} from '../../../shared/http/pagination/pagination-wrapper';
import {UserAdminEditDto} from '../../../shared/models/users/user-admin-edit.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiServiceBase {
  protected url = `${environment.apiUrl}/users`;

  constructor(protected http: HttpClient) {
    super();
  }

  getPaginatedUsernamesFiltered(filter: UsersFilter): Observable<UserUsernameDto[]> {
    return this.getFiltered<PaginationMetadata<UserUsernameDto>, UsersFilter>(
      {url: this.url, filterObj: {...filter}, headers: this.getAcceptHeader(CustomMediaTypeEnum.USER_USERNAME)})
      .pipe(
        map(titlesPage => titlesPage.values.map(e => new UserUsernameDto(e)))
      );
  }

  getPaginatedUserAdminEditFiltered(paginationWrapper: PaginationWrapper<UsersFilter>): Observable<PaginationMetadata<UserAdminEditDto>> {
    return this.getFiltered<PaginationMetadata<UserUsernameDto>, UsersFilter>(
      {
        url: this.url,
        filterObj: {...paginationWrapper.content},
        pagination: paginationWrapper,
        headers: this.getAcceptHeader(CustomMediaTypeEnum.USER_ADMIN_EDIT)
      })
      .pipe(
        map(page => new PaginationMetadata<UserAdminEditDto>(page.values.map(u => new UserAdminEditDto(u)), page.links, page.total))
      );
  }

  update(user: UserAdminEditDto, id: string): Observable<any> {
    return this.http.put(`${this.url}/${id}`, user, {headers: this.getContentTypeHeader(CustomMediaTypeEnum.USER_ROLE)});
  }
}
