import * as _ from 'lodash';

export class PaginationInfo {
  page = 0;
  size = 10;

  constructor(info: Partial<PaginationInfo>) {
    _.assign(info, this);
  }
}

