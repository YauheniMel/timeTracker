import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { InfoMonth } from 'src/app/feature/components/calendar/info-month.interface';

import { StoreApp } from './store.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  getDetailsMonth(targetMonth: DateTime): InfoMonth | { month: number, year: number, listOfDays: null } {
    const { listOfYears } = StoreApp;

    if (listOfYears) {
      const [targetYear] = listOfYears.filter(
        (elem) => elem.year === targetMonth.year,
      );

      if (targetYear && targetYear.listOfMonths) {
        const [month] = targetYear.listOfMonths.filter(
          (elem) => elem.month === targetMonth.month,
        );

        return month || { month: targetMonth.month, year: targetMonth.year, listOfDays: null };
      }
    }

    return { month: targetMonth.month, year: targetMonth.year, listOfDays: null };
  }
}
