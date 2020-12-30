import {DetailedChoiceDto} from '../choices/detailed-choice.dto';
import {EventTranslationDto} from './event-translation.dto';
import * as _ from 'lodash';
import {DetailedEventDto} from './detailed-event.dto';
import {ImageDetailedChoiceDto} from '../choices/image-detailed-choice.dto';
import {ImageDetailedEventEdition} from './image-detailed-event-edition';

export class ImageDetailedEventDto {
  id: string = null;
  choices: ImageDetailedChoiceDto[] = [];
  translations: EventTranslationDto[] = [];
  background: File;
  isDaily = false;
  isActive = false;

  constructor(props?: Partial<ImageDetailedEventDto>) {
    _.assign(this, props);
    this.choices = props?.choices?.map(c => new ImageDetailedChoiceDto(c)) ?? [];
    this.translations = props?.translations?.map(t => new EventTranslationDto(t)) ?? [];
  }


}
