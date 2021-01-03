import * as _ from 'lodash';
import {ResourceTranslationDto} from './resource-translation.dto';
import {ChoiceTranslationDto} from '../choices/choice-translation.dto';
import {ResourceDifficultyDto} from './resource-difficulty.dto';

export class DetailedResourceDto {
  id: string;
  translations: ResourceTranslationDto[];
  difficulties: ResourceDifficultyDto[];
  canDelete = false;
  constructor(props: Partial<DetailedResourceDto>) {
    _.assign(this, props);
    this.translations = props?.translations?.map(translation => new ResourceTranslationDto(translation)) ?? [];
    this.difficulties = props?.difficulties?.map(difficulty => new ResourceDifficultyDto(difficulty)) ?? [];
  }
}


