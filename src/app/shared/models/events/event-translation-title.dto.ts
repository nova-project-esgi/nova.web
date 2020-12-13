import * as _ from 'lodash';
import {Id} from '../../ids/id';

export class EventTranslationTitleDto implements Id<string>{
  id: string = null;
  title: string = null;

  constructor(title: Partial<EventTranslationTitleDto>) {
    _.assign(this, title);
  }
}

