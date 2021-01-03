import {Role} from '../../enums/role';
import * as _ from 'lodash';

export class UserAdminEditDto {
  id: string = null;
  email: string = null;
  username: string = null;
  role: Role = Role.USER;
  canUpdateRole = false;

  constructor(user?: Partial<UserAdminEditDto>) {
    _.assign(this, user);
  }
}
