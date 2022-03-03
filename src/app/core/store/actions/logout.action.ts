import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  LOGOUT_REQUEST = '[Dashboard] Logout Request',
  LOGOUT_FAILURE = '[Dashboard] Logout Failure',
  LOGOUT_SUCCESS = '[Dashboard] Logout Success'
}

export namespace LogoutActions {
  export const logoutRequest = createAction(ActionTypes.LOGOUT_REQUEST);

  export const logoutSuccess = createAction(
    ActionTypes.LOGOUT_SUCCESS,
    props<{ isAuth: boolean }>()
  );

  export const logoutFailure = createAction(ActionTypes.LOGOUT_FAILURE);
}
