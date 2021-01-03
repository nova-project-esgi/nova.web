import * as _ from 'lodash';

export class LanguageEditionDto {
  code: string;
  subCode?: string;
  isDefault: boolean;

  constructor(language: Partial<LanguageEditionDto>) {
    _.assign(this, language);
  }

}
