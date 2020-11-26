import {ObjectUtils} from '../../utils/object.utils';

export class TranslatedEventsTitleFilter {
  title?: string = null;
  language?: string = null;
  constructor(filter?: Partial<TranslatedEventsTitleFilter>) {
    ObjectUtils.copyExistingProperties(filter, this);
  }
}
