import {KeyValue} from '@angular/common';
import {PaginationInfo} from '../pagination/pagination-info';
import {RequestParams} from './request.params';

export interface GetParams<T, F = T> extends RequestParams {
  fieldCtr?: any;
  fields?: Array<keyof T>;
  ascOrderColumnsCtr?: any;
  ascOrderColumns?: Array<keyof T>;
  descOrderCtr?: any;
  descOrderColumns?: Array<keyof T>;
  filterObj?: F;
  filters?: KeyValue<string, any> [];
  pagination?: PaginationInfo;
}
