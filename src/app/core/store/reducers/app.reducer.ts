import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer
} from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/store.interfaces';
import { ActionTypes } from '../actions/logout.action';

import { authReducers } from './auth.reducer';
import { calendarReducers } from './calendar.reducer';
import { dashboardReducers } from './dashboard.reducer';

export const appReducers: ActionReducerMap<AppStateInterface> = {
  isAuth: authReducers,
  profile: dashboardReducers,
  infoMonth: calendarReducers
};

const configMeta = (reducer: ActionReducer<any>): ActionReducer<any> => (state, action) => {
  if (action.type === ActionTypes.LOGOUT_SUCCESS) {
    return reducer(undefined, { type: INIT });
  }

  return reducer(state, action);
};

export const metaReducers: MetaReducer<AppStateInterface>[] = [configMeta];
