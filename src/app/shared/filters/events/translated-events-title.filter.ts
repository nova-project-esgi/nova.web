import {ObjectUtils} from '../../utils/object.utils';
import * as _ from 'lodash';

export class TranslatedEventsTitleFilter {
  title?: string = null;
  language?: string = null;
  constructor(filter?: Partial<TranslatedEventsTitleFilter>) {
    _.assign(this, filter);
  }
}
