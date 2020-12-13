import * as _ from 'lodash';
import {PaginationDefaultEnum} from '../../enums/pagination-default.enum';

export class PaginationInfo {
  page = PaginationDefaultEnum.PAGE;
  size = PaginationDefaultEnum.SIZE;

  constructor(info?: Partial<PaginationInfo>) {
    this.page = info?.page ?? PaginationDefaultEnum.PAGE;
    this.size = info?.size ?? PaginationDefaultEnum.SIZE;
  }
}

