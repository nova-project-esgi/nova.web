import * as _ from 'lodash';

export class EventTranslationTitleDto{
  id: string = null;
  title: string = null;

  constructor(title: Partial<EventTranslationTitleDto>) {
    _.assign(this, title);
  }
}

