import * as fromLanguages from './languages.reducers';
import {LoadableLogEntityState} from '../../states/loadable-log-entity.state';
import {LanguageDto} from '../../models/languages/language.dto';
import {ActionReducerMap} from '@ngrx/store';
import {LanguagesEffects} from './languages.effects';
import * as fromRoot from '../../../core/state/state';



export interface LanguageState {
  languages: LoadableLogEntityState<LanguageDto>;
}

export interface State extends fromRoot.State{
  language: LanguageState;
}

export const reducers: ActionReducerMap<LanguageState> = {
  languages: fromLanguages.reducer
};

export const effects: any[] = [LanguagesEffects];
