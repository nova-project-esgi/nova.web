import {ObjectUtils} from '../../utils/object.utils';

export class LanguageDto {
  id: string;
  code: string;
  subCode?: string;

  constructor(language: Partial<LanguageDto>) {
    ObjectUtils.copyProperties(language, this);
  }

  get displayCode(): string {
    return this.subCode ? `${this.code}-${this.subCode}` : this.code;
  }
}
