import * as _ from 'lodash';

export class LanguagesFilter {
  code: string = null;
  subCode: string = null;

  constructor(filter?: Partial<LanguagesFilter>) {
    _.assign(this, filter);
  }
}
