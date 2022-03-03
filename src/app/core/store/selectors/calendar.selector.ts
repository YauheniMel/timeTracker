import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InfoDay } from 'src/app/shared/types/info-day.interface';
import { InfoMonth } from 'src/app/shared/types/info-month.interface';

export const calendarFeatureSelector =
  createFeatureSelector<InfoMonth>('infoMonth');

export const calendarMonthSelector = createSelector(
  calendarFeatureSelector,
  (infoMonth: InfoMonth): InfoDay[] => infoMonth.listOfDays
);

export const calendarDaySelector = createSelector(
  calendarFeatureSelector,
  (infoMonth: InfoMonth, props: { day: number }): InfoDay =>
    infoMonth.listOfDays.filter((item) => item.day === props.day)[0]
);
