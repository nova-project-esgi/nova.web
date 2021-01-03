import * as _ from 'lodash';

export class DifficultiesFilter {
  language: string = null;
  name: string = null;

  constructor(filter?: Partial<DifficultiesFilter>) {
    _.assign(this, filter);
  }
}
