import { createReducer, on } from '@ngrx/store';

import { LoginActions } from '../actions/login.action';
import { RegisterActions } from '../actions/register.action';

export const authFeatureKey = 'isAuth';

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
    (state): AuthInterface => ({
      ...state,
      isAuth: state.isAuth
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
    (state): AuthInterface => ({
      ...state,
      isAuth: state.isAuth
    })
  ),
  on(
    LoginActions.loginRequest,
    (state): AuthInterface => ({
      ...state,
      isAuth: state.isAuth
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
    (state): AuthInterface => ({
      ...state,
      isAuth: state.isAuth
    })
  )
);
