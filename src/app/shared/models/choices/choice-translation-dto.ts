import * as _ from 'lodash';

export class ChoiceTranslationDto {
  id: string = null;
  eventId: string = null;
  choiceId: string = null;
  resourceIds: string[] = [];
  title: string = null;
  description: string = null;
  language: string = null;

  constructor(choice: Partial<ChoiceTranslationDto>) {
    _.assign(this, choice);
  }
}
