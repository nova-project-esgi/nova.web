import {DetailedDifficultyWithAvailableActionsDto} from '../difficulties/detailed-difficulty-with-available-actions.dto';
import * as _ from 'lodash';
import {DetailedDifficultyDto} from '../difficulties/detailed-difficulty.dto';
import {ResourceDifficultyEditionDto} from './resource-difficulty-edition.dto';
import {ResourceDifficulty} from './resource-difficulty';

export class ResourceDifficultyDto {
  startValue: number;
  difficulty: DetailedDifficultyDto;

  constructor(props?: Partial<ResourceDifficultyDto>) {
    _.assign(this, props);
    this.difficulty = new DetailedDifficultyWithAvailableActionsDto(this.difficulty);
  }

  toResourceDifficultyEditionDto(): ResourceDifficultyEditionDto {
    return new ResourceDifficultyEditionDto({
      difficultyId: this.difficulty.id,
      startValue: this.startValue
    });
  }

  toResourceDifficulty(): ResourceDifficulty {
    return new ResourceDifficulty({
      startValue: this.startValue,
      difficulty: this.difficulty,
      selectedDifficultyTranslationIdx: 0
    });
  }
}

