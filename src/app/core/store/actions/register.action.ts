import { createAction, props } from '@ngrx/store';

import { RegisterInterface } from 'src/app/shared/types/auth.interface';

enum ActionTypes {
  REGISTER_REQUEST = '[Auth] Register Request',
  REGISTER_FAILURE = '[Auth] Register Failure',
  REGISTER_SUCCESS = '[Auth] Register Success'
}

export namespace RegisterActions {
  export const registerRequest = createAction(
    ActionTypes.REGISTER_REQUEST,
    props<{ payload: RegisterInterface }>()
  );

  export const registerSuccess = createAction(
    ActionTypes.REGISTER_SUCCESS,
    props<{ isAuth: boolean }>()
  );

  export const registerFailure = createAction(
    ActionTypes.REGISTER_FAILURE,
    props<{ isAuth: boolean }>()
  );
}
