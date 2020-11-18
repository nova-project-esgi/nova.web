import {ObjectUtils} from '../../utils/object.utils';

export class TranslatedEventDto {
  id: string = null;
  isDaily: boolean = null;
  isActive: boolean = null;
  title: string = null;
  description: string = null;
  languageCode: string = null;

  constructor(event: Partial<TranslatedEventDto>) {
    ObjectUtils.copyProperties(event, this);
  }
}
