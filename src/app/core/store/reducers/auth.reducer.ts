import { createReducer, on } from '@ngrx/store';

import { AppStateInterface } from 'src/app/shared/types/store.interfaces';
import { LoginActions } from '../actions/login.action';
import { RegisterActions } from '../actions/register.action';

export const authFeatureKey = 'Auth';

interface AuthInterface {
  isAuth: boolean;
}

const initialState: AuthInterface = {
  isAuth: false
};

export const authReducers = createReducer(
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
    RegisterActions.registerFailure,
    (state): AppStateInterface => ({
      ...state
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
    LoginActions.loginFailure,
    (state): AppStateInterface => ({
      ...state
    })
  )
);
