import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  daysInMonth!: number[];

  firstDayOfWeek!: number;

  targetMonth: DateTime = DateTime.now();

  date!: Date;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.date = new Date();

    this.setDaysInMonth();
    this.setFirstDay();
  }

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
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent);
    // this.dialog.ngOnDestroy();

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
