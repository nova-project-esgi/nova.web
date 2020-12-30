import {DetailedChoiceDto} from '../choices/detailed-choice.dto';
import {EventTranslationDto} from './event-translation.dto';
import * as _ from 'lodash';
import {ImageDetailedEventDto} from './image-detailed-event.dto';
import {ImageDetailedResourceDto} from '../resources/image-detailed-resource.dto';

export class DetailedEventDto {
  id: string = null;
  choices: DetailedChoiceDto[] = [];
  translations: EventTranslationDto[] = [];

  constructor(props?: Partial<DetailedEventDto>) {
    _.assign(this, props);
    this.choices = props?.choices?.map(choice => new DetailedChoiceDto(choice)) ?? [];
    this.translations = props?.translations?.map(event => new EventTranslationDto(event)) ?? [];
  }

  toImageDetailedEventDto(availableImageResources: ImageDetailedResourceDto[], backgroundImage: File = null): ImageDetailedEventDto {
    const choices = this.choices.map(choice => {
      const choiceResources = choice.filterMatchingResources(availableImageResources);
      return choice.toImageDetailedChoiceDto(choiceResources);
    });
    return new ImageDetailedEventDto({...this, choices, background: backgroundImage});
  }

}


