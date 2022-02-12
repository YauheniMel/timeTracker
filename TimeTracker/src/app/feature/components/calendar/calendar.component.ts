import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { StoreService } from 'src/app/core/store/store.service';
import { InfoDay } from 'src/app/shared/components/day/info-day.interface';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { InfoMonth } from './info-month.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  daysInMonth!: number[];

  firstDayOfWeek!: number;

  targetMonth: DateTime = DateTime.now();

  infoMonth?: InfoMonth;

  date!: Date;

  constructor(public dialog: MatDialog, private storeService: StoreService) {}

  ngOnInit(): void {
    this.date = new Date();

    this.setDaysInMonth();
    this.setFirstDay();

    this.infoMonth = this.storeService.getDetailsMonth(this.targetMonth);
  }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.dialog.ngOnDestroy();

      console.log('The dialog was closed');
    });
  }

  getInfoDay(day: number): InfoDay | undefined {
    return this.infoMonth?.listOfDays.filter((e) => e.day === day)[0];
  }
}
