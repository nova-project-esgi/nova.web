import {ObjectUtils} from './object.utils';
import * as Case from 'case';
import {KeyValue} from '@angular/common';
import {UrlUtils} from './url.utils';
import {GramOrderEnum} from '../enums/gram-order.enum';
import {QueryEnum} from '../enums/query.enum';
import {PaginationInfo} from '../http/pagination/pagination-info';

export class QueryUtils {
  static getFilterQueryFromObj<T>(obj: T): KeyValue<string, any>[] {
    if (!obj){
      return [];
    }
    // let filterObj = ObjectUtils.setKeysTextBorder(obj, 'Filter', GramOrderEnum.SUFFIX);
    // filterObj = ObjectUtils.changeKeysCase(filterObj, Case.camel);
    return UrlUtils.transformObjToParams(obj);
  }


  static getQueryArrayFromConstructor(ctr: any, queryType: QueryEnum = QueryEnum.FIELDS): KeyValue<string, any>[] {
    if (!ctr){
      return [];
    }
    const fields = ObjectUtils.getPropertiesByType(ctr);
    return fields.map(f => ({key: `${queryType.toLowerCase()}[]`, value: f}));
  }

  static getQueryArrayFromPropertiesArray<P>(properties: (keyof P)[], queryType: QueryEnum = QueryEnum.FIELDS): KeyValue<string, any>[] {
    if (!properties) {
      return [];
    }
    return properties.map(f => ({key: `${queryType.toLowerCase()}[]`, value: f}));
  }
}
