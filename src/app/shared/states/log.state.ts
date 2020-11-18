import {ObjectUtils} from '../utils/object.utils';

export interface Log {
  type: string;
  message: string;
}

export class LogState {
  logs: Log = {
    message: undefined,
    type: undefined
  };
  lastAction: string = null;

  constructor(state: Partial<LogState>) {
    ObjectUtils.copyProperties(state, this);
  }

}
