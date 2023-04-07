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

  dayInfo!: InfoDay;

  daysPreviousMonth: number[] = [];

  daysNextMonth: number[] = [];

  subscribe!: Subscription;

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
      const day = countDays - daysNum;

      this.daysPreviousMonth.push(day);
    }
  }

  buildDaysNextMonth(count: number): void {
    this.daysNextMonth = [];
    let day = 1;
    let daysNum = count;

    const daysInWeek = 7;

    while (daysInWeek - daysNum++) {
      this.daysNextMonth.push(day++);
    }
  }

  changeMonth(action: string) {
    if (action === 'increase') {
      this.targetMonth = this.targetMonth.plus({ month: 1 });
    } else if (action === 'decrease') {
      this.targetMonth = this.targetMonth.minus({ month: 1 });
    }

    this.date = new Date();
    this.date.setFullYear(this.targetMonth.year);
    this.date.setMonth(this.targetMonth.month - 1);

    this.setFirstDay();
  }

  getDayInfo(day: number): void {
    this.subscribe = this.store
      .pipe(select(calendarDaySelector(day)))
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
      this.subscribe.unsubscribe();
      this.dialog.ngOnDestroy();
    });
  }

  getInitDayInfo(day: number) {
    const hoursInDay = 24;

    return {
      day,
      freeTime: Array.from(Array(hoursInDay).keys()),
      month: this.targetMonth.month,
      year: this.targetMonth.year,
      toDos: null
    };
  }
}
