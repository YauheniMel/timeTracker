import { createAction, props } from '@ngrx/store';
import { LoginInterface } from 'src/app/shared/types/auth.interface';

export enum ActionTypes {
  LOGIN_REQUEST = '[Auth] Login Request',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGIN_SUCCESS = '[Auth] Login Success'
}

export namespace LoginActions {
  export const loginRequest = createAction(
    ActionTypes.LOGIN_REQUEST,
    props<{ payload: LoginInterface }>()
  );

  export const loginSuccess = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<{ isAuth: boolean }>()
  );

  export const loginFailure = createAction(ActionTypes.LOGIN_FAILURE);
}
