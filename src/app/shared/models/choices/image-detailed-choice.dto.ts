import {ChoiceTranslationDto} from './choice-translation.dto';
import * as _ from 'lodash';
import {DetailedChoice} from './detailed.choice';
import {ImageDetailedChoiceResourceDto} from '../resources/image-detailed-choice-resource.dto';

export class ImageDetailedChoiceDto {
  id: string = null;
  translations: ChoiceTranslationDto[] = [];
  resources: ImageDetailedChoiceResourceDto[] = [];

  constructor(props?: Partial<ImageDetailedChoiceDto>) {
    _.assign(this, props);
    this.translations = props?.translations.map(t => new ChoiceTranslationDto(t)) ?? [];
    this.resources = props?.resources.map(r => new ImageDetailedChoiceResourceDto(r)) ?? [];
  }

  toDetailedChoice(): DetailedChoice {
    return new DetailedChoice({
      id: this.id,
      resources: this.resources.map(r => r.toDetailedChoiceResource()),
      translations: this.translations
    });
  }
}
