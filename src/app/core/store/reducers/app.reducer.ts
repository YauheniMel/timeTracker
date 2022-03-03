import { combineReducers } from '@ngrx/store';

import { authReducers } from './auth.reducer';
import { calendarReducers } from './calendar.reducer';
import { dashboardReducers } from './dashboard.reducer';

export const appReducer = combineReducers({
  isAuth: authReducers,
  profile: dashboardReducers,
  infoMonth: calendarReducers
});
