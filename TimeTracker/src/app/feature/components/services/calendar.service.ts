import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { InfoDay } from 'src/app/shared/components/day/info-day.interface';
import { InfoMonth } from '../calendar/info-month.interface';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Injectable()
export class CalendarService {
  daysInMonth!: number[];

  firstDayOfWeek!: number;

  targetMonth: DateTime = DateTime.now();

  date: Date = new Date();

  constructor(public dialog: MatDialog) {}

  setDaysInMonth(): void {
    const countDays = this.targetMonth.daysInMonth;
    this.daysInMonth = Array(countDays)
      .fill(0)
      .map((x, i) => i + 1);
  }

  setFirstDay() {
    const { month } = this.targetMonth;
    this.firstDayOfWeek = new Date(this.date.getFullYear(), month - 1, 1).getDay() + 1;
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
  }

  openDialog(
    infoDay: InfoDay,
    infoMonth: InfoMonth | { month: number; year: number; listOfDays: null },
  ): void {
    const data = {
      infoDay,
      infoMonth,
    };

    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dialog.ngOnDestroy();

      console.log('The dialog was closed');
    });
  }
}
