import {ObjectUtils} from '../../utils/object.utils';
import * as _ from 'lodash';

export class TranslatedEventsFilter {
  title?: string = null;
  language?: string = null;
  constructor(filter?: Partial<TranslatedEventsFilter>) {
    _.assign(this, filter);
  }
}
