import { Action, createReducer, on } from '@ngrx/store';

import { LoginActions } from './login.action';
import { RegisterActions } from './register.action';

export const authFeatureKey = 'Auth';

interface AuthInterface {
  isAuth: boolean;
}

const initialState = {
  isAuth: false
};

const authReducer = createReducer(
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
  )
);

export function reducer(state = initialState, action: Action) {
  return authReducer(state, action);
}
