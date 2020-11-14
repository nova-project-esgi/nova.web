import {JWT} from '../JWT';
import {Role} from '../../enums/Role';
import {ObjectUtils} from '../../utils/object.utils';

export class UserResumeDto{
  id: string;
  username: string;
  token: JWT;
  email: string;
  role: Role;

  constructor(user: Partial<UserResumeDto>) {
    ObjectUtils.copyProperties(user, this);
  }

}

