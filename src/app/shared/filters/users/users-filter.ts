import * as _ from 'lodash';

export class UsersFilter {
  username?: string = null;
  constructor(filter?: Partial<UsersFilter>) {
    _.assign(this, filter);
  }
}
