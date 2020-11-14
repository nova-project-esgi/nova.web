import {createSelector} from '@ngrx/store';
import {AppState} from '../states/app.state';

export const selectUserState = (state: AppState) => state.userState;

export const selectConnectedUser = createSelector(selectUserState, userState => userState.connectedUser);

