import {ObjectUtils} from '../../utils/object.utils';

export class UserLoginCmdDto {
  username = '';
  password = '';

  constructor(user?: Partial<UserLoginCmdDto>) {
    ObjectUtils.copyExistingProperties(user, this);
  }
}
