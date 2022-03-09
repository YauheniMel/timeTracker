import { createReducer, on } from '@ngrx/store';

import { LoginActions } from '../actions/login.action';
import { RegisterActions } from '../actions/register.action';

export const authFeatureKey = 'isAuth';

export interface AuthInterface {
  isAuth: boolean;
}

const initialState: AuthInterface = {
  isAuth: false
};

export const authReducers = createReducer(
  initialState,
  on(
    RegisterActions.registerRequest,
    (state): AuthInterface => ({
      ...state
    })
  ),
  on(
    RegisterActions.registerSuccess,
    (state, { isAuth }): AuthInterface => ({
      ...state,
      isAuth
    })
  ),
  on(
    RegisterActions.registerFailure,
    (state, { isAuth }): AuthInterface => ({
      ...state,
      isAuth
    })
  ),
  on(
    LoginActions.loginRequest,
    (state): AuthInterface => ({
      ...state
    })
  ),
  on(
    LoginActions.loginSuccess,
    (state, { isAuth }): AuthInterface => ({
      ...state,
      isAuth
    })
  ),
  on(
    LoginActions.loginFailure,
    (state, { isAuth }): AuthInterface => ({
      ...state,
      isAuth
    })
  )
);
