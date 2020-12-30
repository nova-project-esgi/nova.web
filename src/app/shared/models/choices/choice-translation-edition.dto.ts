import * as _ from 'lodash';

export class ChoiceTranslationEditionDto {
    title: string = null;
    description: string = null;
    languageId: string = null;

    constructor(choice: Partial<ChoiceTranslationEditionDto>) {
        _.assign(this, choice);
    }
}
