import * as _ from 'lodash';
import {ResourceTranslationEditionDto} from './resource-translation-edition.dto';
import {DetailedResourceEditionDto} from './detailed-resource-edition.dto';

export class ImageDetailedResourceEditionDto {
  translations: ResourceTranslationEditionDto[];
  icon: File;
  canDelete = false;

  constructor(props: Partial<ImageDetailedResourceEditionDto>) {
    _.assign(this, props);
  }

  toResourceWithTranslations(): DetailedResourceEditionDto {
    return new DetailedResourceEditionDto({translations: this.translations});
  }
}
