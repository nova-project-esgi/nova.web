import * as _ from 'lodash';

export class DifficultyTranslationEdition {
  name: string;
  languageId: string;

  constructor(props?: Partial<DifficultyTranslationEdition>) {
    _.assign(this, props);
  }

}
