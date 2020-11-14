import {JWT} from '../JWT';
import {ObjectUtils} from '../../utils/object.utils';
import {Role} from '../../enums/Role';

export class User {
  id: string;
  username: string;
  password: string;
  role: Role;

  rememberMe: boolean;
  jwt: JWT;

  constructor(user: Partial<User>) {
    ObjectUtils.copyProperties(user, this);
  }

}
