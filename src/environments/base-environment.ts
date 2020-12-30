import * as _ from 'lodash';

export class BaseEnvironment {
  production = false;
  localUrl = 'http://localhost:4200';
  apiUrl = 'http://localhost:8001';

  constructor(env?: Partial<BaseEnvironment>) {
    _.assign(this, env);
  }
}
