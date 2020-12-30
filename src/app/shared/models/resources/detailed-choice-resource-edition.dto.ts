import {ResourceTranslationDto} from './resource-translation.dto';
import {DetailedResourceDto} from './detailed-resource.dto';
import * as _ from 'lodash';

export class DetailedChoiceResourceEditionDto {
    resourceId: string = null;
    changeValue = 0;

    constructor(props: Partial<DetailedChoiceResourceEditionDto>) {
        _.assign(this, props);
    }
}
