import {ObjectUtils} from '../../utils/object.utils';
import {logType} from './log.types';
import * as _ from 'lodash';

export interface Log {
  type: string | logType;
  message: string;
}

export class LogState {
  logs: Log = {
    message: null,
    type: null
  };
  lastAction: string = null;

  constructor(state: Partial<LogState>) {
    _.assign(this, state);
  }

}
