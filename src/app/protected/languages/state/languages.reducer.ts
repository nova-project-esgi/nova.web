import {createReducer, on} from '@ngrx/store';
import * as LanguagesActions from './languages.actions';
import {LoadableLogState} from '../../../shared/redux/states/loadable-log.state';
import {LoadableLogEntityState} from '../../../shared/redux/states/loadable-log-entity.state';
import {PaginationResume} from '../../../shared/http/pagination/pagination-resume';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {LanguagesFilter} from '../../../shared/filters/languages/languages.filter';
import {PaginationLogEntityState} from '../../../shared/redux/states/pagination-log-entity.state';
import {LanguageWithAvailableActionsDto} from '../../../shared/models/languages/language-with-available-actions.dto';
import {act} from '@ngrx/effects';

export const languagesFeatureKey = 'languages';

export class State extends PaginationLogEntityState<LanguageWithAvailableActionsDto> {
  filter: LanguagesFilter;
  canCreate = false;
}

const adapter: EntityAdapter<LanguageWithAvailableActionsDto> = createEntityAdapter<LanguageWithAvailableActionsDto>();
export const initialState: State = adapter.getInitialState(new State());


export const reducer = createReducer<State>(
  initialState,
  on(LanguagesActions.updateFilter, (state, a) => ({...state, filter: a.payload})),
  on(LanguagesActions.loadLanguagesPageFiltered, state => LoadableLogEntityState.toLoadState(state, LanguagesActions.updateFilter)),
  on(LanguagesActions.loadLanguagesPageFilteredSuccess, (state, action) =>
    PaginationLogEntityState.onLoadPageSuccess(adapter, state, action)
  ),
  on(LanguagesActions.updatePagination, (state, action) =>
    ({...state, paginationResume: action.payload})),
  on(LanguagesActions.loadLanguagesPageFilteredFailure, (state, action) => LoadableLogEntityState.toLoadFailureState(state, action)),
  on(LanguagesActions.setNextPage, (state) => {
    const newPage = new PaginationResume(state.paginationResume);
    if (newPage.hasNext) {
      newPage.page++;
      return {...state, paginationResume: newPage};
    }
    return {...state};
  }),
  on(LanguagesActions.setPreviousPage, (state) => {
    const newPage = new PaginationResume(state.paginationResume);
    if (newPage.hasPrevious) {
      newPage.page--;
      return {...state, paginationResume: newPage};
    }
    return {...state};
  }),


  on(LanguagesActions.canCreate, state => LoadableLogEntityState.toLoadState(state, LanguagesActions.canCreate)),
  on(LanguagesActions.canCreateSuccess, (state, action) =>
    LoadableLogEntityState.toLoadSuccessState({...state, canCreate: action.payload}, LanguagesActions.canCreateSuccess)
  ),
  on(LanguagesActions.canCreateFailure, (state, action) => LoadableLogEntityState.toLoadFailureState(state, action)),
  on(LanguagesActions.canUpdate, (state) => LoadableLogEntityState.toLoadState(state, LanguagesActions.canUpdate)),
  on(LanguagesActions.canUpdateSuccess, (state, action) =>
    adapter.updateOne({id: action.payload.id, changes: action.payload},
      LoadableLogEntityState.toLoadSuccessState(state, LanguagesActions.canUpdateSuccess))
  ),
  on(LanguagesActions.canUpdateFailure, (state, action) => LoadableLogEntityState.toLoadFailureState(state, action)),
  on(LanguagesActions.createLanguage, state => LoadableLogState.toLoadState(state, LanguagesActions.createLanguage)),
  on(LanguagesActions.createLanguageSuccess, (state) => LoadableLogEntityState.toLoadSuccessState(state, LanguagesActions.createLanguageSuccess)),
  on(LanguagesActions.createLanguageFailure, (state, action) => LoadableLogState.toLoadFailureState(state, action)),

  on(LanguagesActions.deleteLanguage, state => LoadableLogState.toLoadState(state, LanguagesActions.deleteLanguage)),
  on(LanguagesActions.deleteLanguageSuccess, (state, action) => {
    return adapter.removeOne(action.payload, LoadableLogEntityState.toLoadSuccessState(state, LanguagesActions.deleteLanguageSuccess));
  }),
  on(LanguagesActions.deleteLanguageFailure, (state, action) => LoadableLogState.toLoadFailureState(state, action)),

  on(LanguagesActions.updateLanguage, state => LoadableLogState.toLoadState(state, LanguagesActions.updateLanguage)),
  on(LanguagesActions.updateLanguageSuccess, (state, action) => {
    let languages = selectAll(state);
    languages = languages.map(language => new LanguageWithAvailableActionsDto({
      ...language,
      canUpdate: !languages.some(l => l.id !== language.id && l.code === language.code && l.subCode === language.subCode),
      isDefault: !(action.payload.isDefault && language.id !== action.payload.id && language.isDefault)
    }));
    return adapter.updateOne(
      {id: action.payload.id, changes: action.payload},
      LoadableLogEntityState.toLoadSuccessState(adapter.setAll(languages, state), LanguagesActions.updateLanguageSuccess));
  }),
  on(LanguagesActions.updateLanguageFailure, (state, action) => LoadableLogState.toLoadFailureState(state, action)),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
