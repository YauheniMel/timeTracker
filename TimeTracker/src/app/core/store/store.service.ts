import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { InfoMonth } from 'src/app/feature/components/calendar/info-month.interface';

import { StoreApp } from './store.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  getDetailsMonth(targetMonth: DateTime): InfoMonth | undefined {
    const { listOfYears } = StoreApp;

    if (listOfYears) {
      const [targetYear] = listOfYears.filter(
        (elem) => elem.year === targetMonth.year
      );

      if (targetYear.listOfMonths) {
        const [month] = targetYear.listOfMonths.filter(
          (elem) => elem.month === targetMonth.month
        );

        return month;
      }
    }

    return undefined;
  }
}
