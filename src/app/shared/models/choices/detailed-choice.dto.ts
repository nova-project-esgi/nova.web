import {ChoiceTranslationDto} from './choice-translation.dto';
import * as _ from 'lodash';
import {DetailedResourceDto} from '../resources/detailed-resource.dto';
import {ImageDetailedResourceDto} from '../resources/image-detailed-resource.dto';
import {ImageDetailedChoiceResourceDto} from '../resources/image-detailed-choice-resource.dto';
import {DetailedChoiceResourceDto} from '../resources/detailed-choice-resource.dto';
import {ImageDetailedChoiceDto} from './image-detailed-choice.dto';

export class DetailedChoiceDto {
  id: string = null;
  translations: ChoiceTranslationDto[] = [];
  resources: DetailedChoiceResourceDto[] = [];

  constructor(props?: Partial<DetailedChoiceDto>) {
    _.assign(this, props);
    this.translations = props?.translations?.map(translation => new ChoiceTranslationDto(translation)) ?? [];
    this.resources = props?.resources?.map(resource => new DetailedChoiceResourceDto(resource)) ?? [];
  }

  toImageDetailedChoiceDto(resources: ImageDetailedResourceDto[]): ImageDetailedChoiceDto {
    const imageResources = this.resources.map(r => {
      const foundResource = resources.find(resource => resource.id === r.resource.id);
      return new ImageDetailedChoiceResourceDto({changeValue: r.changeValue, resource: foundResource});
    });
    return new ImageDetailedChoiceDto({...this, resources: imageResources});
  }

  filterMatchingResources<T extends DetailedResourceDto>(resources: T[]): T[] {
    return resources.filter(resource => this.resources.some(r => r.resource.id === resource.id));
  }

}


