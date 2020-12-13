import {ObjectUtils} from '../../utils/object.utils';
import {UserLoginCmdDto} from './user-login-cmd.dto';

export class UserRegisterCmdDto extends UserLoginCmdDto {
  email = '';
  rememberMe = false;

  constructor(user?: Partial<UserLoginCmdDto>) {
    super(user);
    ObjectUtils.copyExistingProperties(user, this);
  }
}
