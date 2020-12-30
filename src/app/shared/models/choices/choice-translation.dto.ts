import * as _ from 'lodash';
import {LanguageDto} from '../languages/language.dto';
import {ChoiceTranslationEditionDto} from './choice-translation-edition.dto';

export class ChoiceTranslationDto {
  title: string = null;
  description: string = null;
  language: LanguageDto = null;

  constructor(choice: Partial<ChoiceTranslationDto>) {
    _.assign(this, choice);
    this.language = new LanguageDto(choice?.language);
  }

  toEdition(): ChoiceTranslationEditionDto {
    return new ChoiceTranslationEditionDto({
      description: this.description, languageId: this.language.id, title: this.title
    });
  }
}

