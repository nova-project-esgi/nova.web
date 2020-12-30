import {createReducer, on} from '@ngrx/store';
import * as LanguagesFilterActions from './languages-filter.actions';
import {LoadableLogState} from '../../../../shared/redux/states/loadable-log.state';
import {LanguagesFilter} from '../../../../shared/filters/languages/languages.filter';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';

export const languagesFilterFeatureKey = 'languagesFilter';

export class State extends LoadableLogState {
  filter: LanguagesFilter = new LanguagesFilter();
}

export const initialState: State = new State();


export const reducer = createReducer(
  initialState,
  on(LanguagesFilterActions.updateFilter, (state, a) => ({...state, filter: a.payload})),
);

