import { createAction, props } from '@ngrx/store';

import { InfoMonth } from 'src/app/shared/types/info-month.interface';
import {
  TaskInterface,
  TasksInterface
} from 'src/app/shared/types/task.interface';

enum ActionTypes {
  GET_MONTH_REQUEST = '[Calendar] Get month Request',
  GET_MONTH_FAILURE = '[Calendar] Get month Failure',
  GET_MONTH_SUCCESS = '[Calendar] Get month Success',
  SET_TASK_REQUEST = '[Calendar] Set task Request',
  SET_TASK_FAILURE = '[Calendar] Set task Failure',
  SET_TASK_SUCCESS = '[Calendar] Set task Success'
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

  export const taskRequest = createAction(
    ActionTypes.SET_TASK_REQUEST,
    props<{ payload: TaskInterface }>()
  );

  export const taskSuccess = createAction(
    ActionTypes.SET_TASK_SUCCESS,
    props<{ infoTasks: TasksInterface }>()
  );

  export const taskFailure = createAction(ActionTypes.SET_TASK_FAILURE);
}
