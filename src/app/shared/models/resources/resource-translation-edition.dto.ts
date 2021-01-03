import * as _ from 'lodash';

export class ResourceTranslationEditionDto{
  name: string;
  languageId: string;

  constructor(props?: Partial<ResourceTranslationEditionDto>) {
    _.assign(this, props);
  }
}

