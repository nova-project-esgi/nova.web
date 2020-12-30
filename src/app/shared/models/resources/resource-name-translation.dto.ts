import * as _ from 'lodash';

export class ResourceNameTranslationDto {
  name: string = null;

  constructor(props?: Partial<ResourceNameTranslationDto>) {
    _.assign(this, props);
  }
}
