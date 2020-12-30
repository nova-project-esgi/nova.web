import {ImageDetailedResourceDto} from './image-detailed-resource.dto';
import * as _ from 'lodash';
import {DetailedChoiceResourceEditionDto} from './detailed-choice-resource-edition.dto';

export class DetailedChoiceResource {
  resource: ImageDetailedResourceDto;
  changeValue = 0;
  resourceTranslationIdx = 0;

  constructor(props: Partial<DetailedChoiceResource>) {
    _.assign(this, props);
  }

  toEdition(): DetailedChoiceResourceEditionDto {
    return new DetailedChoiceResourceEditionDto({
      changeValue: this.changeValue, resourceId: this.resource.id
    });
  }
}

