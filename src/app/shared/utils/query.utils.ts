import {ObjectUtils} from './object.utils';
import * as Case from 'case';
import {KeyValue} from '@angular/common';
import {UrlUtils} from './url.utils';
import {GramOrderEnum} from '../enums/gram-order.enum';
import {QueryEnum} from '../enums/query.enum';

export class QueryUtils{
  static getFilterQueryFromObj<T>(obj: T): KeyValue<string, any>[]{
    let filterObj = ObjectUtils.setKeysTextBorder(obj, 'Filter', GramOrderEnum.SUFFIX);
    filterObj = ObjectUtils.changeKeysCase(filterObj, Case.snake);
    return UrlUtils.transformObjToParams(filterObj);
  }

  static getQueryArrayFromConstructor(ctr: any, queryType: QueryEnum = QueryEnum.FIELDS): KeyValue<string, any>[]{
    const fields = ObjectUtils.getPropertiesByType(ctr);
    return fields.map(f => ({key: `${queryType.toLowerCase()}[]`, value: f}));
  }

  static getQueryArrayFromPropertiesArray<P>(properties: (keyof P)[], queryType: QueryEnum = QueryEnum.FIELDS): KeyValue<string, any>[]{
    if (!properties) { return []; }
    return properties.map(f => ({key: `${queryType.toLowerCase()}[]`, value: f}));
  }
}
