import { createReducer, on } from '@ngrx/store';

import { InfoMonth } from 'src/app/shared/types/info-month.interface';
import { CalendarActions } from '../actions/calendar.action';

export const calendarFeatureKey = 'infoMonth';

const initialState: InfoMonth = {
  month: 0,
  year: 0,
  listOfDays: []
};

export const calendarReducers = createReducer(
  initialState,
  on(
    CalendarActions.calendarRequest,
    (state): InfoMonth => ({
      ...state
    })
  ),
  on(
    CalendarActions.calendarSuccess,
    (state, { infoMonth }): InfoMonth => ({
      ...state,
      ...infoMonth
    })
  ),
  on(
    CalendarActions.calendarFailure,
    (state): InfoMonth => ({
      ...state
    })
  ),
  on(
    CalendarActions.taskRequest,
    (state): InfoMonth => ({
      ...state
    })
  ),
  on(
    CalendarActions.taskSuccess,
    (state, { infoTasks }): InfoMonth => ({
      ...state,
      listOfDays: state.listOfDays.map((dayInfo) => {
        if(dayInfo.day === infoTasks.day) {
          return infoTasks;
        }
        return dayInfo;
      })
    })
  ),
  on(
    CalendarActions.calendarFailure,
    (state): InfoMonth => ({
      ...state
    })
  )
);
