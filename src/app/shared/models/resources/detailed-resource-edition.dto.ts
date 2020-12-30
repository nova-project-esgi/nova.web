import {ResourceTranslationEditionDto} from './resource-translation-edition.dto';
import * as _ from 'lodash';

export class DetailedResourceEditionDto {
  translations: ResourceTranslationEditionDto[];
  constructor(props: Partial<DetailedResourceEditionDto>) {
    _.assign(this, props);
  }
}
