import {ObjectUtils} from '../utils/object.utils';

export class Jwt {
  token: string;

  constructor(jwt: Partial<Jwt>) {
    ObjectUtils.copyExistingProperties(jwt, this);
  }
}
