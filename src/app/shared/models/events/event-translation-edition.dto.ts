import * as _ from 'lodash';

export class EventTranslationEditionDto {

    title: string = null;
    description: string = null;
    languageId: string = null;

    constructor(translation?: Partial<EventTranslationEditionDto>) {
        _.assign(this, translation);
    }
}
