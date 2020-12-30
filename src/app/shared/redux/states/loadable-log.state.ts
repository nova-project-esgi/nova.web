import {LogState} from './log.state';
import {Payload} from '../payload';
import {HttpErrorResponse} from '@angular/common/http';
import {TypedAction} from '@ngrx/store/src/models';
import * as _ from 'lodash';

export class LoadableLogState extends LogState {
  loading = false;
  loaded = false;

  constructor(state?: Partial<LoadableLogState>) {
    super(state);
  }

  public static toLoadState<T extends LoadableLogState>(state: T, action: TypedAction<string>): T{
    return _.cloneDeep({...state, loading: true, loaded: false, logs: {type: 'LOAD', message: action.type}});
  }

  public static toLoadSuccessState<T extends LoadableLogState>(state: T, action: TypedAction<string>): T{
    return _.cloneDeep({...state, loaded: true, loading: false, logs: {type: 'SUCCESS', message: action.type}});
  }
  public static toLoadFailureState<T extends LoadableLogState>(state: T, action: Payload<HttpErrorResponse>): T{
    return _.cloneDeep({...state, logs: {type: 'ERROR', message: action.payload.message}, loading: false, loaded: true});
  }

}
