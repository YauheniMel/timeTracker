import { Action, createReducer, on } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

import { LoginActions } from './login.action';
import { LogoutActions } from './logout.action';
import { RegisterActions } from './register.action';

export const authFeatureKey = 'Auth';

const initialState: AppStateInterface = {
  isAuth: false
};

const authReducer = createReducer(
  initialState,
  on(
    RegisterActions.registerRequest,
    (state): AppStateInterface => ({
      ...state
    })
  ),
  on(
    RegisterActions.registerSuccess,
    (state, { isAuth }): AppStateInterface => ({
      ...state,
      isAuth
    })
  ),
  on(
    LoginActions.loginRequest,
    (state): AppStateInterface => ({
      ...state
    })
  ),
  on(
    LoginActions.loginSuccess,
    (state, { isAuth }): AppStateInterface => ({
      ...state,
      isAuth
    })
  ),
  on(
    LogoutActions.logoutRequest,
    (state): AppStateInterface => ({
      ...state
    })
  ),
  on(
    LogoutActions.logoutSuccess,
    (state, { isAuth }): AppStateInterface => ({
      ...state,
      isAuth
    })
  )
);

export function reducer(state = initialState, action: Action) {
  return authReducer(state, action);
}
