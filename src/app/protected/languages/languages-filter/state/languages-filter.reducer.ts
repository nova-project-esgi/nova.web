import {createReducer, on} from '@ngrx/store';
import * as LanguagesFilterActions from './languages-filter.actions';
import {LoadableLogState} from '../../../../shared/redux/states/loadable-log.state';
import {LanguagesFilter} from '../../../../shared/filters/languages/languages.filter';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';

export const languagesFilterFeatureKey = 'languagesFilter';

export class State extends LoadableLogState {
  filter: LanguagesFilter = new LanguagesFilter();
  languages: LanguageDto[] = [];

}

export const initialState: State = new State();


export const reducer = createReducer(
  initialState,
  on(LanguagesFilterActions.updateFilter, (state, a) => ({...state, filter: a.payload})),
  on(LanguagesFilterActions.loadLanguages, state => LoadableLogState.toLoadState(state, LanguagesFilterActions.loadLanguages)),
  on(LanguagesFilterActions.loadLanguagesSuccess, (state, action) => {
    return {...LoadableLogState.toLoadSuccessState(state, LanguagesFilterActions.loadLanguagesSuccess), languages: action.payload};
  }),
  on(LanguagesFilterActions.loadLanguagesFailure, (state, action) => LoadableLogState.toLoadFailureState(state, action))
);

