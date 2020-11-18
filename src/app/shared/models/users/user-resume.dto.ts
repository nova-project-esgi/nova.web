import {Jwt} from '../jwt';
import {Role} from '../../enums/role';
import {ObjectUtils} from '../../utils/object.utils';

export class UserResumeDto {
  id: string;
  username: string;
  token: Jwt;
  email: string;
  role: Role;
  rememberMe: boolean;

  constructor(user: Partial<UserResumeDto>) {
    ObjectUtils.copyProperties(user, this);
  }

}

