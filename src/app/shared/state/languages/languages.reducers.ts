import {errorGetAllLanguages, getAllLanguages, successGetAllLanguages} from './language.actions';
import {Action, createReducer, on} from '@ngrx/store';
import {LanguageDto} from '../../models/languages/language.dto';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {LoadableLogEntityState} from '../../states/loadable-log-entity.state';


const adapter: EntityAdapter<LanguageDto> = createEntityAdapter<LanguageDto>();

export const initialState: LoadableLogEntityState<LanguageDto> = adapter.getInitialState(new LoadableLogEntityState<LanguageDto>());

const languagesReducers = createReducer(initialState,
  on(getAllLanguages, (s: LoadableLogEntityState<LanguageDto>) => ({...s, loading: true, loaded: false})),
  on(successGetAllLanguages, (s: LoadableLogEntityState<LanguageDto>, a) => {
    return adapter.addMany(a.payload, {...s, loaded: true, loading: false});
  }),
  on(errorGetAllLanguages, (s: LoadableLogEntityState<LanguageDto>, a) => (
    {...s, logs: {type: 'ERROR', message: a.payload.message}, loading: false, loaded: true}
  ))
);

export function reducer(state: LoadableLogEntityState<LanguageDto> | undefined, action: Action): LoadableLogEntityState<LanguageDto> {
  return languagesReducers(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

