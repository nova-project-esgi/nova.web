import {LanguageDto} from '../languages/language.dto';
import * as _ from 'lodash';
import {ResourceTranslationEditionDto} from './resource-translation-edition.dto';

export class ResourceTranslationDto {
  name: string;
  language: LanguageDto;

  constructor(props?: Partial<ResourceTranslationDto>) {
    _.assign(this, props);
    this.language = new LanguageDto(this.language);
  }

  toResourceTranslationEditionDto(): ResourceTranslationEditionDto {
    return new ResourceTranslationEditionDto({
      languageId: this.language.id,
      name: this.name
    });
  }
}
