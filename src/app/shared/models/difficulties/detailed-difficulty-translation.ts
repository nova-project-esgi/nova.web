import {LanguageDto} from '../languages/language.dto';
import {DetailedDifficultyDto} from './detailed-difficulty.dto';
import * as _ from 'lodash';

export class DetailedDifficultyTranslation {
  name: string = null;
  language: LanguageDto = null;
  difficulty: DetailedDifficultyDto = null;

  constructor(props?: Partial<DetailedDifficultyTranslation>) {
    _.assign(this, props);
    this.language = new LanguageDto(props?.language);
    this.difficulty = new DetailedDifficultyDto(props?.difficulty);
  }

}
