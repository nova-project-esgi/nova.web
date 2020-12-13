import * as _ from 'lodash';

export class ChoiceTranslationFilter {
  ids?: string[] = [];
  constructor(filter?: Partial<ChoiceTranslationFilter>) {
    _.assign(this, filter);
  }
}
