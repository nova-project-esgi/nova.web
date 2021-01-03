import {Component, OnInit} from '@angular/core';
import {UsersFilter} from '../../../../shared/filters/users/users-filter';
import {FormListEditionComponent} from '../../../../shared/components/bases/form-list-edition.component';
import {UsersEditComponent} from '../users-edit/users-edit.component';
import {UserAdminEditDto} from '../../../../shared/models/users/user-admin-edit.dto';
import {FormBuilder} from '@angular/forms';
import {trackById} from '../../../../shared/track-by/generic-track-by';
import {PaginationResume} from '../../../../shared/http/pagination/pagination-resume';
import {PageEvent} from '@angular/material/paginator';
import {Payload} from '../../../../shared/redux/payload';
import * as fromUsers from '../../states/users/users.reducer';
import * as UsersSelectors from '../../states/users/users.selectors';
import * as UsersActions from '../../states/users/users.actions';
import {Store} from '@ngrx/store';
import * as LanguagesSelectors from '../../../languages/state/languages.selectors';
import * as _ from 'lodash';
import * as LanguagesActions from '../../../languages/state/languages.actions';

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styles: []
})
export class UsersListPageComponent extends FormListEditionComponent<UsersEditComponent, UserAdminEditDto> implements OnInit {
  trackByFn = trackById;
  pagination: PaginationResume;
  private updateIdx: number;

  onPageChange($event: PageEvent): void {
    this.store.dispatch(UsersActions.updatePagination(new Payload<PaginationResume>(PaginationResume.fromPageEvent($event))));
  }

  constructor(protected fb: FormBuilder, private store: Store<fromUsers.State>) {
    super(fb);
    this.store.select(UsersSelectors.selectPaginationResume).subscribe(pagination => {
      if (pagination && pagination.page !== null && pagination.size !== null && !_.isEqual(this.pagination, pagination)) {
        this.store.dispatch(UsersActions.loadUsersPageFiltered());
      }
      this.pagination = pagination;
    });
    this.store.select(UsersSelectors.selectUsers).subscribe(users => {
      if (users) {
        if (this.updateIdx >= 0) {
          this.elements[this.updateIdx] = users[this.updateIdx];
          this.updateIdx = -1;
        } else {
          this.elements = users;
        }
      }
    });
    // this.store.select(UsersSelectors.userUpdated).subscribe(isUpdated => {
    //   if (isUpdated) {
    //     this.store.dispatch(UsersActions.loadUsersPageFiltered());
    //   }
    // });
  }

  ngOnInit(): void {
  }

  onFilterReset(): void {

  }

  updateFilter(filter: UsersFilter): void {
    this.store.dispatch(UsersActions.updateFilter(new Payload<UsersFilter>(filter)));
  }

  getUsers(): void {
    this.store.dispatch(UsersActions.loadUsersPageFiltered());
  }

  onUserUpdated(user: UserAdminEditDto, i: number): void {
    this.updateIdx = i;
    this.store.dispatch(UsersActions.updateUser(new Payload<UserAdminEditDto>(user)));
  }
}
