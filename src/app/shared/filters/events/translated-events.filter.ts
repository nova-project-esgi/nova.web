import {ObjectUtils} from '../../utils/object.utils';

export class TranslatedEventsFilter {
  title?: string = null;
  language?: string = null;
  constructor(filter?: Partial<TranslatedEventsFilter>) {
    ObjectUtils.copyExistingProperties(filter, this);
  }
}
