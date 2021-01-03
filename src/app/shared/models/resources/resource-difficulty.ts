import * as _ from 'lodash';
import {DetailedDifficultyDto} from '../difficulties/detailed-difficulty.dto';
import {ResourceDifficultyDto} from './resource-difficulty.dto';

export class ResourceDifficulty {
  startValue = 0;
  difficulty: DetailedDifficultyDto;
  selectedDifficultyTranslationIdx = 0;

  constructor(props?: Partial<ResourceDifficulty>) {
    _.assign(this, props);
    this.difficulty = new DetailedDifficultyDto(this.difficulty);
  }

  toResourceDifficultyDto(): ResourceDifficultyDto {
    return new ResourceDifficultyDto({
      difficulty: this.difficulty,
      startValue: this.startValue
    });
  }
}


