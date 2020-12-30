import {DetailedResourceDto} from './detailed-resource.dto';
import * as _ from 'lodash';
import {DetailedChoiceResource} from './detailed-choice-resource';

export class DetailedChoiceResourceDto {
  resource: DetailedResourceDto;
  changeValue = 0;

  constructor(props: Partial<DetailedChoiceResourceDto>) {
    _.assign(this, props);
    this.resource = new DetailedResourceDto(this.resource);
  }
}
