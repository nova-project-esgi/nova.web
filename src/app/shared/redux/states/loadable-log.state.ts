import {LogState} from './log.state';

export class LoadableLogState extends LogState {
  loading = false;
  loaded = false;

  constructor(state?: Partial<LoadableLogState>) {
    super(state);
  }
}
