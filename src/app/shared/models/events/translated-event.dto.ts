import * as _ from 'lodash';

export class TranslatedEventDto {
  id: string = null;
  translationId: string = null;
  isDaily: boolean = null;
  isActive: boolean = null;
  title: string = null;
  description: string = null;
  languageCode: string = null;

  constructor(event: Partial<TranslatedEventDto>) {
    _.assign(event, this);
  }
}
