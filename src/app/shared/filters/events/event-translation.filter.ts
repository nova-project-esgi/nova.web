import * as _ from 'lodash';

export class EventTranslationFilter {
  ids?: string[] = null;
  constructor(filter?: Partial<EventTranslationFilter>) {
    _.assign(this, filter);
  }
}
