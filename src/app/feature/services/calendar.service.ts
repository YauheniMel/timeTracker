import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';

import { calendarDaySelector } from 'src/app/core/store/selectors/calendar.selector';
import { InfoDay } from 'src/app/shared/types/info-day.interface';
import { ModalWindowComponent } from '../components/modal-window/modal-window.component';

@Injectable()
export class CalendarService {
  firstDayOfWeek!: number;

  targetMonth: DateTime = DateTime.now();

  date: Date = new Date();

  subscription!: Subscription;

  dayInfo!: InfoDay;

  daysPreviousMonth: number[] = [];

  daysNextMonth: number[] = [];

  daySubscribe: any;

  constructor(public dialog: MatDialog, private store: Store) {}

  setFirstDay() {
    const { month } = this.targetMonth;
    this.firstDayOfWeek = new Date(
      this.date.getFullYear(),
      month - 1,
      1
    ).getDay();

    const lastDayOfWeek =
      new Date(this.date.getFullYear(), month, 0).getDay() + 1;

    this.buildDaysPreviousMonth(this.firstDayOfWeek);

    this.buildDaysNextMonth(lastDayOfWeek);
  }

  buildDaysPreviousMonth(count: number): void {
    this.daysPreviousMonth = [];

    const countDays = this.targetMonth.minus({ month: 1 }).daysInMonth;

    let daysNum = count;
    while (daysNum--) {
      const day = countDays - count;

      this.daysPreviousMonth.push(day);
    }
  }

  buildDaysNextMonth(count: number): void {
    this.daysNextMonth = [];
    let day = 1;
    let daysNum = count;

    while (7 - daysNum++) {
      this.daysNextMonth.push(day++);
    }
  }

  changeMonth(action: string) {
    if (action === 'plus') {
      this.targetMonth = this.targetMonth.plus({ month: 1 });
    } else if (action === 'minus') {
      this.targetMonth = this.targetMonth.minus({ month: 1 });
    }

    this.date = new Date();
    this.date.setFullYear(this.targetMonth.year);
    this.date.setMonth(this.targetMonth.month - 1);

    this.setFirstDay();
  }

  getDayInfo(day: number): void {
    this.subscription = this.store
      .pipe(select(calendarDaySelector, { day }))
      .subscribe((infoDay) => {
        if (!infoDay) {
          this.dayInfo = this.getInitDayInfo(day);
        } else {
          const { freeTime = [], month, toDos, year } = infoDay;

          this.dayInfo = {
            day,
            freeTime,
            month,
            year,
            toDos
          };
        }

        this.openDialog(this.dayInfo);
      });
  }

  openDialog(infoDay: InfoDay): void {
    const data = { ...infoDay };

    const dialogRef = this.dialog.open(ModalWindowComponent, { data });

    dialogRef.afterClosed().subscribe(() => {
      this.dialog.ngOnDestroy();

      this.subscription.unsubscribe();
    });
  }

  getInitDayInfo(day: number) {
    return {
      day,
      freeTime: Array.from(Array(24).keys()),
      month: this.targetMonth.month,
      year: this.targetMonth.year,
      toDos: null
    };
  }
}
