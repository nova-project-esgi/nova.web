import * as _ from 'lodash';

export class EventOption {
  isDaily = false;
  isActive = false;

  constructor(props?: Partial<EventOption>) {
    _.assign(this, props);
  }
}
