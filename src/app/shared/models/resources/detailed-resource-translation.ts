import {LanguageDto} from '../languages/language.dto';
import * as _ from 'lodash';
import {ResourceTranslationEditionDto} from './resource-translation-edition.dto';
import {ImageDetailedResourceDto} from './image-detailed-resource.dto';

export class DetailedResourceTranslation {
  name: string;
  language: LanguageDto;
  resource: ImageDetailedResourceDto;

  constructor(props?: Partial<DetailedResourceTranslation>) {
    _.assign(this, props);
    this.language = new LanguageDto(this.language);
  }
}

