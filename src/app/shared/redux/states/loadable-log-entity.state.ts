import {Dictionary, EntityState} from '@ngrx/entity';
import {LoadableLogState} from './loadable-log.state';
export class LoadableLogEntityState<T> extends LoadableLogState implements EntityState<T> {
  entities: Dictionary<T>;
  ids: string[] | number[];
  selectedId: string | number = null;

  constructor(state?: Partial<LoadableLogState>) {
    super(state);
  }



}

