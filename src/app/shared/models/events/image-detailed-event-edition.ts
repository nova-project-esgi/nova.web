import {DetailedChoiceEditionDto} from '../choices/detailed-choice-edition.dto';
import {EventTranslationEditionDto} from './event-translation-edition.dto';
import * as _ from 'lodash';
import {DetailedEventEditionDto} from './detailed-event-edition.dto';
import {ImageDetailedEventDto} from './image-detailed-event.dto';

export class ImageDetailedEventEdition {
  id: string;
  choices: DetailedChoiceEditionDto[] = [];
  translations: EventTranslationEditionDto[] = [];
  image: File = null;
  isActive = false;
  isDaily = false;

  constructor(props?: Partial<ImageDetailedEventEdition>) {
    _.assign(this, props);
  }

  toDetailedEdition(): DetailedEventEditionDto {
    return new DetailedEventEditionDto({
      isDaily: this.isDaily,
      isActive: this.isActive,
      translations: this.translations,
      choices: this.choices
    });
  }

}
