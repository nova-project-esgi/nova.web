import {Id} from '../../ids/id';
import * as _ from 'lodash';

export class TranslatedResourceDto implements  Id<string>{
  id: string = null;
  translationIds: string[] = [];
  choiceIds: string[] = [];
  isDaily: boolean = null;
  isActive: boolean = null;
  title: string = null;
  description: string = null;
  language: string = null;

  constructor(event: Partial<TranslatedEventDto>) {
    _.assign(this, event);
  }
}
