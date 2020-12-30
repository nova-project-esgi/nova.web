import * as _ from 'lodash';
import {ImageDetailedResourceDto} from './image-detailed-resource.dto';
import {DetailedChoiceResource} from './detailed-choice-resource';

export class ImageDetailedChoiceResourceDto {
  resource: ImageDetailedResourceDto;
  changeValue = 0;

  constructor(props: Partial<ImageDetailedChoiceResourceDto>) {
    _.assign(this, props);
    this.resource = new ImageDetailedResourceDto(props?.resource);
  }

  toDetailedChoiceResource(): DetailedChoiceResource {
    return new DetailedChoiceResource({
      resource: this.resource,
      changeValue: this.changeValue,
      resourceTranslationIdx: 0
    });
  }
}



