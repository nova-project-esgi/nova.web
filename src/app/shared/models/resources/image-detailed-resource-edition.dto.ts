import * as _ from 'lodash';
import {ResourceTranslationEditionDto} from './resource-translation-edition.dto';
import {DetailedResourceEditionDto} from './detailed-resource-edition.dto';
import {ResourceDifficultyEditionDto} from './resource-difficulty-edition.dto';

export class ImageDetailedResourceEditionDto {
  translations: ResourceTranslationEditionDto[];
  difficulties: ResourceDifficultyEditionDto[];
  icon: File;
  canDelete = false;

  constructor(props: Partial<ImageDetailedResourceEditionDto>) {
    _.assign(this, props);
    this.translations = this.translations.map(t => new ResourceTranslationEditionDto(t));
    this.difficulties = this.difficulties.map(d => new ResourceDifficultyEditionDto(d));
  }

  toResourceWithTranslations(): DetailedResourceEditionDto {
    return new DetailedResourceEditionDto({translations: this.translations, difficulties: this.difficulties});
  }
}
