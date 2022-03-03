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
  )
);
