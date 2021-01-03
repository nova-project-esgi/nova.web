import * as _ from 'lodash';
import {DifficultyTranslationDto} from './difficulty-translation.dto';
import {DetailedDifficultyDto} from './detailed-difficulty.dto';

export class DetailedDifficultyWithAvailableActionsDto {
  id: string;
  translations: DifficultyTranslationDto[];
  isDefault: boolean;
  canDelete = false;
  canSetDefault = false;
  rank = 0;

  constructor(props: Partial<DetailedDifficultyWithAvailableActionsDto>) {
    _.assign(this, props);
    this.translations = props?.translations?.map(translation => new DifficultyTranslationDto(translation)) ?? [];
  }

  toDetailedDifficultyDto(): DetailedDifficultyDto {
    return new DetailedDifficultyDto({
      id: this.id,
      translations: this.translations,
      isDefault: this.isDefault,
      rank: this.rank
    });
  }
}




