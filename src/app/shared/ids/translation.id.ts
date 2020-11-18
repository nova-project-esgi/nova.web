import {Id} from './id';

export interface TranslationId<ID> extends Id<ID>{
  language: string;
}
