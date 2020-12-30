import * as _ from 'lodash';

export class ResourcesFilter {
  name?: string = null;
  language?: string = null;
  constructor(filter?: Partial<ResourcesFilter>) {
    _.assign(this, filter);
  }
}
