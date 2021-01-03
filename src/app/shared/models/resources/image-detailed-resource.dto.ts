import {ResourceTranslationDto} from './resource-translation.dto';
import * as _ from 'lodash';
import {DetailedResourceEditionDto} from './detailed-resource-edition.dto';
import {DetailedResourceDto} from './detailed-resource.dto';
import {DetailedChoiceResourceEditionDto} from './detailed-choice-resource-edition.dto';

export class ImageDetailedResourceDto extends DetailedResourceDto{
  icon: File = null;

  constructor(props?: Partial<ImageDetailedResourceDto>) {
    super(props);
    _.merge(this, props);
  }

  toResourceWithTranslationEdition(): DetailedResourceEditionDto {
    return new DetailedResourceEditionDto({
      translations: this.translations.map(t => t.toResourceTranslationEditionDto()),
      difficulties: this.difficulties.map(d => d.toResourceDifficultyEditionDto())
    });
  }

}
