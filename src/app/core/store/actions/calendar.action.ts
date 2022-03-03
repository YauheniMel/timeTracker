import { createAction, props } from '@ngrx/store';
import { InfoMonth } from 'src/app/shared/types/info-month.interface';

export enum ActionTypes {
  GET_MONTH_REQUEST = '[Calendar] Get month Request',
  GET_MONTH_FAILURE = '[Calendar] Get month Failure',
  GET_MONTH_SUCCESS = '[Calendar] Get month Success'
}

export namespace CalendarActions {
  export const calendarRequest = createAction(
    ActionTypes.GET_MONTH_REQUEST,
    props<{ payload: { month: number; year: number } }>()
  );

  export const calendarSuccess = createAction(
    ActionTypes.GET_MONTH_SUCCESS,
    props<{ infoMonth: InfoMonth }>()
  );

  export const calendarFailure = createAction(ActionTypes.GET_MONTH_FAILURE);
}
