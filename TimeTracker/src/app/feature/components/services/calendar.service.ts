import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { take } from 'rxjs';
import { DatabaseService } from 'src/app/core/database.service';
import { InfoDay } from 'src/app/shared/components/day/info-day.interface';
import { InfoMonth } from '../calendar/info-month.interface';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Injectable()
export class CalendarService {
  daysInMonth!: number[];

  firstDayOfWeek!: number;

  targetMonth: DateTime = DateTime.now();

  date: Date = new Date();

  dayInfo!: InfoDay;

  infoMonth!: InfoMonth | { month: number; year: number; listOfDays: null };

  constructor(public dialog: MatDialog, private database: DatabaseService) {}

  setDaysInMonth(): void {
    const countDays = this.targetMonth.daysInMonth;
    this.daysInMonth = Array(countDays)
      .fill(0)
      .map((x, i) => i + 1);
  }

  setFirstDay() {
    const { month } = this.targetMonth;
    this.firstDayOfWeek =
      new Date(this.date.getFullYear(), month - 1, 1).getDay() + 1;
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

    this.setDaysInMonth();
    this.setFirstDay();

    this.database
      .getDbByParameter(this.targetMonth.year, this.targetMonth.month)
      .subscribe((res) => {
        [this.infoMonth] = res; // need use
      });
  }

  getDayInfo(day: number): void {
    this.database
      .getDbByParameter(this.targetMonth.year, this.targetMonth.month, day)
      .pipe(take(1))
      .subscribe((res) => {
        if (!res.length) {
          this.dayInfo = this.getInitDayInfo(day);
        } else {
          this.dayInfo = {
            day: res[0],
            freeTime: res[1],
            month: res[2],
            year: res[4],
            toDos: res[3],
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

      console.log('The dialog was closed');
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
