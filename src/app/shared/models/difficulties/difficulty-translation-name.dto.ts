import * as _ from 'lodash';

export class DifficultyTranslationNameDto {
  difficultyId: string = null;
  name: string = null;

  constructor(props?: Partial<DifficultyTranslationNameDto>) {
    _.assign(this, props);

  }

}
