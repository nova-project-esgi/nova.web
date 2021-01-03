import * as _ from 'lodash';

export class UserUsernameDto {
  id: string = null;
  username: string = null;

  constructor(props?: Partial<UserUsernameDto>) {
    _.assign(this, props);
  }

}
