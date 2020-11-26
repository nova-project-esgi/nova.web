import {Jwt} from '../jwt';
import {Role} from '../../enums/role';
import {ObjectUtils} from '../../utils/object.utils';

export class ConnectedUser {
  username: string;
  token: string;
  email: string;
  role: Role;
  rememberMe: boolean;

  constructor(user: Partial<ConnectedUser>) {
    ObjectUtils.copyProperties(user, this);
  }

}

