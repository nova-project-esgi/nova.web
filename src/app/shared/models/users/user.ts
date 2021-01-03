import {Role} from '../../enums/role';
import * as _ from 'lodash';

export class User {
  id: string;
  username: string;
  password: string;
  role: Role;

  rememberMe: boolean;
  token: string;

  constructor(user?: Partial<User>) {
    _.assign(this, user);
  }

}

