import {ChoiceTranslationEditionDto} from './choice-translation-edition.dto';
import {DetailedChoiceResource} from '../resources/detailed-choice-resource';
import * as _ from 'lodash';
import {DetailedChoice} from './detailed.choice';
import {DetailedChoiceResourceEditionDto} from '../resources/detailed-choice-resource-edition.dto';

export class DetailedChoiceEditionDto {
  id: string = null;
  translations: ChoiceTranslationEditionDto[] = [];
  resources: DetailedChoiceResourceEditionDto[] = [];

  constructor(props?: Partial<DetailedChoiceEditionDto>) {
    _.assign(this, props);
  }
}
