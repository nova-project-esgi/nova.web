import {ResourceTranslationEditionDto} from './resource-translation-edition.dto';
import * as _ from 'lodash';
import {ResourceDifficultyDto} from './resource-difficulty.dto';
import {ResourceDifficultyEditionDto} from './resource-difficulty-edition.dto';

export class DetailedResourceEditionDto {
  translations: ResourceTranslationEditionDto[];
  difficulties: ResourceDifficultyEditionDto[];
  constructor(props: Partial<DetailedResourceEditionDto>) {
    _.assign(this, props);
  }
}
