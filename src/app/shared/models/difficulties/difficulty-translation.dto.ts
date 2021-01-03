import {LanguageDto} from '../languages/language.dto';
import * as _ from 'lodash';
import {DifficultyTranslationEdition} from './difficulty-translation-edition';

export class DifficultyTranslationDto {
  name: string = null;
  language: LanguageDto = null;

  constructor(props?: Partial<DifficultyTranslationDto>) {
    _.assign(this, props);
    this.language = new LanguageDto(this.language);
  }

  toEdition(): DifficultyTranslationEdition {
    return new DifficultyTranslationEdition({
      languageId: this.language.id,
      name: this.name
    });
  }

}
