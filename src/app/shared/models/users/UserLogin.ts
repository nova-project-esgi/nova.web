import {UserLoginCmdDto} from './UserLoginCmdDto';
import {ObjectUtils} from '../../utils/object.utils';

export class UserLogin extends UserLoginCmdDto{
  rememberMe = false;
  constructor(user: Partial<UserLogin>) {
    super();
    ObjectUtils.copyProperties(user, this);
  }
}
