import * as _ from 'lodash';
import {EventTranslationEditionDto} from './event-translation-edition.dto';
import {DetailedChoiceEditionDto} from '../choices/detailed-choice-edition.dto';

export class DetailedEventEditionDto {
    choices: DetailedChoiceEditionDto[] = [];
    translations: EventTranslationEditionDto[] = [];
    isActive = false;
    isDaily = false;
    constructor(props?: Partial<DetailedEventEditionDto>) {
        _.assign(this, props);
    }
}
