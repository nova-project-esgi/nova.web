import {PaginationInfo} from './pagination-info';
import * as _ from 'lodash';

export class PaginationWrapper<T> extends PaginationInfo{
  content: T = null;
  constructor(info: Partial<PaginationWrapper<T>>) {
    super(info);
    this.content = info.content;
    _.assign(this.content, info.content);
  }
}
