import * as _ from 'lodash';
import {ResourceTranslationDto} from './resource-translation.dto';
import {ChoiceTranslationDto} from '../choices/choice-translation.dto';

export class DetailedResourceDto {
  id: string;
  translations: ResourceTranslationDto[];
  canDelete = false;
  constructor(props: Partial<DetailedResourceDto>) {
    _.assign(this, props);
    this.translations = props?.translations?.map(translation => new ResourceTranslationDto(translation)) ?? [];
  }
}

