import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { DatabaseService } from 'src/app/core/database.service';
import { InfoDay } from 'src/app/shared/components/day/info-day.interface';
import { ModalWindowComponent } from '../components/modal-window/modal-window.component';

@Injectable()
export class CalendarService {
  firstDayOfWeek!: number;

  targetMonth: DateTime = DateTime.now();

  date: Date = new Date();

  dayInfo!: InfoDay;

  daysPreviousMonth: number[] = [];

  daysNextMonth: number[] = [];

  daySubscribe: any;

  constructor(public dialog: MatDialog, private database: DatabaseService) {}

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

    while (count--) {
      const day = countDays - count;

      this.daysPreviousMonth.push(day);
    }
  }

  buildDaysNextMonth(count: number): void {
    this.daysNextMonth = [];
    let day = 1;
    while (7 - count++) {
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
    this.daySubscribe = this.database
      .getDbByParameter(this.targetMonth.year, this.targetMonth.month, day)
      .subscribe((res) => {
        if (!res.length) {
          this.dayInfo = this.getInitDayInfo(day);
        } else {
          let freeTime; // eslint: to one line
          let month;
          let toDos;
          let year;
          if (Array.isArray(res[1])) {
            [, freeTime, month, toDos, year] = res;
          } else {
            freeTime = [];
            [, month, toDos, year] = res;
          }

          this.dayInfo = {
            day,
            freeTime,
            month,
            year,
            toDos,
          };
        }

        this.openDialog(this.dayInfo);
      });
  }

  openDialog(infoDay: InfoDay): void {
    const data = {
      ...infoDay,
    };

    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dialog.ngOnDestroy();

      this.daySubscribe.unsubscribe();
    });
  }

  getInitDayInfo(day: number) {
    return {
      day,
      freeTime: Array.from(Array(24).keys()),
      month: this.targetMonth.month,
      year: this.targetMonth.year,
      toDos: null,
    };
  }
}
