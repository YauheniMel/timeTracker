import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  LOGOUT_REQUEST = '[Auth] Logout Request',
  LOGOUT_FAILURE = '[Auth] Logout Failure',
  LOGOUT_SUCCESS = '[Auth] Logout Success'
}

export namespace LogoutActions {
  export const logoutRequest = createAction(ActionTypes.LOGOUT_REQUEST);

  export const logoutSuccess = createAction(
    ActionTypes.LOGOUT_SUCCESS,
    props<{ isAuth: boolean }>()
  );

  export const logoutFailure = createAction(ActionTypes.LOGOUT_FAILURE);
}
