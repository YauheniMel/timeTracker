import { createReducer, on } from '@ngrx/store';
import { DashboardInterface } from 'src/app/shared/types/store.interfaces';

import { DashboardActions } from '../actions/dashboard.action';
import { LogoutActions } from '../actions/logout.action';

export const authFeatureKey = 'profile';

const initialState: DashboardInterface = {
  firstName: '',
  lastName: ''
};

export const dashboardReducers = createReducer(
  initialState,
  on(
    DashboardActions.getUser,
    (state): DashboardInterface => ({
      ...state
    })
  ),
  on(
    DashboardActions.getUserSuccess,
    (state, { profile }): DashboardInterface => ({
      ...state,
      ...profile
    })
  ),
  on(
    LogoutActions.logoutRequest,
    (state): DashboardInterface => ({
      ...state
    })
  ),
  on(LogoutActions.logoutSuccess, (state): DashboardInterface => {
    const newState = {
      firstName: '',
      lastName: ''
    };

    return {
      ...state,
      ...newState
    };
  }),
  on(
    LogoutActions.logoutFailure,
    (state): DashboardInterface => ({
      ...state
    })
  )
);
