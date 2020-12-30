import * as _ from 'lodash';
import {Id} from '../../ids/id';

export class LanguageDto implements Id<string>{
  id: string;
  code: string;
  subCode?: string;
  canUpdate =  false;
  isDefault = false;

  constructor(language: Partial<LanguageDto>) {
    _.assign(this, language);
  }

  get displayCode(): string {
    return this.subCode ? `${this.code}-${this.subCode}` : this.code;
  }

}

