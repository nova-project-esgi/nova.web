import {createReducer, on} from '@ngrx/store';
import * as LanguagesActions from './languages.actions';
import {LoadableLogEntityState} from '../../redux/states/loadable-log-entity.state';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {LanguageDto} from '../../models/languages/language.dto';
import {LoadableLogState} from '../../redux/states/loadable-log.state';

export const languagesFeatureKey = 'shared-languages';

export class State extends LoadableLogEntityState<LanguageDto> {

}

const adapter: EntityAdapter<LanguageDto> = createEntityAdapter<LanguageDto>();

export const initialState: LoadableLogEntityState<LanguageDto> = adapter.getInitialState(new State());


export const reducer = createReducer(
  initialState,
  on(LanguagesActions.loadLanguages, state => LoadableLogState.toLoadState(state, LanguagesActions.loadLanguages)),
  on(LanguagesActions.loadLanguagesSuccess, (state, action) => {
    return adapter.addMany(action.payload, LoadableLogState.toLoadSuccessState(state, LanguagesActions.loadLanguagesSuccess));
  }),
  on(LanguagesActions.loadLanguagesFailure, (state, action) => LoadableLogState.toLoadFailureState(state, action)),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

