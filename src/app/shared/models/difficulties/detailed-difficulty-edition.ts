import {DifficultyTranslationEdition} from './difficulty-translation-edition';
import * as _ from 'lodash';

export class DetailedDifficultyEdition {
  id: string = null;
  rank = 0;
  isDefault = false;
  translations: DifficultyTranslationEdition[] = [];

  constructor(props?: Partial<DetailedDifficultyEdition>) {
    _.assign(this, props);
    this.translations = this.translations?.map(t => new DifficultyTranslationEdition(t)) ?? [];
  }

}
