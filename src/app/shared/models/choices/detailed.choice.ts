import {ChoiceTranslationDto} from './choice-translation.dto';
import * as _ from 'lodash';
import {DetailedChoiceResource} from '../resources/detailed-choice-resource';
import {DetailedChoiceEditionDto} from './detailed-choice-edition.dto';

export class DetailedChoice {
  id: string = null;
  translations: ChoiceTranslationDto[] = [];
  resources: DetailedChoiceResource[] = [];

  constructor(props?: Partial<DetailedChoice>) {
    _.assign(this, props);
  }

  toEdition(): DetailedChoiceEditionDto {
    return new DetailedChoiceEditionDto({
      id: this.id, resources: this.resources.map(r => r.toEdition()), translations: this.translations.map(t => t.toEdition())
    });
  }
}

