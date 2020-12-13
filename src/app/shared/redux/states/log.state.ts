import {ObjectUtils} from '../../utils/object.utils';
import {logType} from './log.types';

export interface Log {
  type: string | logType;
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
