import * as _ from 'lodash';

export class DifficultyOption {
  canSetDefault = false;
  isDefault = false;
  rank = 0;

  constructor(props?: Partial<DifficultyOption>) {
    _.assign(this, props);
  }

}
