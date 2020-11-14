import {ObjectUtils} from '../../utils/object.utils';
import {UserLoginCmdDto} from './UserLoginCmdDto';

export class UserRegisterCmdDto extends UserLoginCmdDto{
  email = '';

  constructor(user?: Partial<UserLoginCmdDto>) {
    super(user);
    ObjectUtils.copyExistingProperties(user, this);
  }
}
