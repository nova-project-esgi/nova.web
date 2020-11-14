import {ObjectUtils} from '../utils/object.utils';

export class JWT {
  token: string;
  constructor(jwt: Partial<JWT>) {
    ObjectUtils.copyExistingProperties(jwt, this);
  }
}
