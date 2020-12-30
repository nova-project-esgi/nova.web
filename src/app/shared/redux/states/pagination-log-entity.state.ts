import {Dictionary, EntityAdapter} from '@ngrx/entity';
import {PaginationResume} from '../../http/pagination/pagination-resume';
import {LoadableLogEntityState} from './loadable-log-entity.state';
import {TypedAction} from '@ngrx/store/src/models';
import {Payload} from '../payload';
import {PaginationMetadata} from '../../http/pagination/pagination-metadata';
import * as LanguagesActions from '../../../protected/languages/state/languages.actions';

export class PaginationLogEntityState<T> extends LoadableLogEntityState<T> {
  entities: Dictionary<T>;
  ids: string[] | number[];
  selectedId: string | number = null;
  paginationResume: PaginationResume = null;

  constructor(state?: Partial<PaginationLogEntityState<T>>) {
    super(state);
  }

  public static onLoadPageSuccess<T, S extends  PaginationLogEntityState<T>>(
    adapter: EntityAdapter<
      T>,
    state: S,
    action: TypedAction<any> & Payload<PaginationMetadata<T>>): S {
    return adapter.setAll(action.payload.values, LoadableLogEntityState.toLoadSuccessState({
      ...state,
      paginationResume: PaginationResume.fromPaginationMetadata(action.payload)
    }, LanguagesActions.loadLanguagesPageFilteredSuccess));
  }


}
