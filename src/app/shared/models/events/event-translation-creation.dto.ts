import * as _ from 'lodash';

export class EventTranslationCreationDto {

  eventId: string = null;
  title: string = null;
  description: string = null;
  languageId: string = null;

  constructor(translation?: Partial<EventTranslationCreationDto>) {
    _.assign(this, translation);
  }
}
