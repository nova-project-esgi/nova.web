import * as _ from 'lodash';

export class LanguageEditionDto {
  code: string;
  subCode?: string;

  constructor(language: Partial<LanguageEditionDto>) {
    _.assign(this, language);
  }

}
