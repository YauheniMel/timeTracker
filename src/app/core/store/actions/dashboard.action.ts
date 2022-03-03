import { createAction, props } from '@ngrx/store';
import { DashboardInterface } from 'src/app/shared/types/store.interfaces';

export enum ActionTypes {
  GET_USER = '[Dashboard] Get user',
  GET_USER_SUCCESS = '[Dashboard] Get user success'
}

export namespace DashboardActions {
  export const getUser = createAction(ActionTypes.GET_USER);

  export const getUserSuccess = createAction(
    ActionTypes.GET_USER_SUCCESS,
    props<{ profile: DashboardInterface }>()
  );
}
