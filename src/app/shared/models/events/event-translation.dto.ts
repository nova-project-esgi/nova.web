import * as _ from 'lodash';
import {LanguageDto} from '../languages/language.dto';
import {EventTranslationEditionDto} from './event-translation-edition.dto';

export class EventTranslationDto {

  title: string = null;
  description: string = null;
  language: LanguageDto = null;

  constructor(translation?: Partial<EventTranslationDto>) {
    _.assign(this, translation);
    this.language = new LanguageDto(translation?.language);
  }

  toEditionDto(): EventTranslationEditionDto {
    return new EventTranslationEditionDto({
      description: this.description,
      title: this.title,
      languageId: this.language.id
    });
  }
}


