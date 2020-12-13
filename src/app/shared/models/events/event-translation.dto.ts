import * as _ from 'lodash';
import {Id} from '../../ids/id';

export class EventTranslationDto implements  Id<string>{

  id: string = null;
  eventId: string = null;
  languageId: string = null;
  title: string = null;
  description: string = null;
  language: string = null;

  constructor(translation?: Partial<EventTranslationDto>) {
    _.assign(this, translation);
  }
}
