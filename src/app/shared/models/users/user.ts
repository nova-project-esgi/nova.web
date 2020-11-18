import {Jwt} from '../jwt';
import {ObjectUtils} from '../../utils/object.utils';
import {Role} from '../../enums/role';

export class User {
  id: string;
  username: string;
  password: string;
  role: Role;

  rememberMe: boolean;
  token: Jwt;

  constructor(user: Partial<User>) {
    ObjectUtils.copyProperties(user, this);
  }

}
