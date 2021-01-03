import {Component, OnInit} from '@angular/core';
import {FilterComponent} from '../../../../../shared/components/bases/filter.component';
import {UsersFilter} from '../../../../../shared/filters/users/users-filter';
import * as fromUsersFilter from '../../states/users-filter/users-filter.reducer';
import * as UsersFilterAction from '../../states/users-filter/users-filter.actions';
import {Store} from '@ngrx/store';
import {FormBuilder, FormControl} from '@angular/forms';
import {Payload} from '../../../../../shared/redux/payload';
import {merge, Observable} from 'rxjs';
import {UserUsernameDto} from '../../../../../shared/models/users/user-username.dto';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import * as UsersFilterSelectors from '../../states/users-filter/users-filter.selectors';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styles: []
})
export class UsersFilterComponent extends FilterComponent<UsersFilter> implements OnInit {

  usernameCtrl: FormControl;
  filteredUsernames: Observable<UserUsernameDto[]>;
  usernames: UserUsernameDto[] = [];


  constructor(private store: Store<fromUsersFilter.State>, private fb: FormBuilder) {
    super();

    this.usernameCtrl = this.fb.control('', {});
    this.filterGrp = this.fb.group({
      username: this.usernameCtrl
    });
    this.filterGrp.valueChanges.subscribe((userFilter: UsersFilter) => {
      this.store.dispatch(UsersFilterAction.updateFilter(new Payload<UsersFilter>(userFilter)));
    });
    this.store.select(UsersFilterSelectors.selectFilter).subscribe(filter => {
      if (!_.isEqual(this.filter, filter) && filter.username) {
        this.store.dispatch(UsersFilterAction.loadUsernames());
      }
      this.filter = new UsersFilter(filter);
      this.filterChanged.emit(this.filter);
    });
    this.filteredUsernames = merge(
      this.usernameCtrl.valueChanges.pipe(
        map(username => this.filterUsernames(username))
      ),
      this.store.select(UsersFilterSelectors.selectUsernames).pipe(
        map(usernames => {
          _.assign(this.usernames, usernames);
          return this.filterUsernames(this.usernameCtrl.value);
        })
      )
    );
  }

  private filterUsernames(username: string): UserUsernameDto[] {
    return this.usernames.filter(u => _.startsWith(u?.username?.toLowerCase(), username?.toLowerCase()));
  }

  ngOnInit(): void {
  }

  reset(): void {
    this.filterGrp.reset();
    this.filterReset.emit(true);
  }

  confirm(): void {
    this.filterConfirmed.emit();
  }

}
