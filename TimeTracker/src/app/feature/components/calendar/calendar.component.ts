import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { DateTime } from 'luxon';
import { StoreService } from 'src/app/core/store/store.service';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { CalendarService } from '../services/calendar.service';
import { InfoMonth } from './info-month.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  infoMonth?: InfoMonth;

  constructor(
    public dialog: MatDialog,
    private storeService: StoreService,
    public calendarService: CalendarService,
  ) {}

  ngOnInit(): void {
    this.calendarService.setDaysInMonth();
    this.calendarService.setFirstDay();

    this.infoMonth = this.storeService.getDetailsMonth(this.calendarService.targetMonth);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.dialog.ngOnDestroy();

      console.log('The dialog was closed');
    });
  }

  changeMonth(action:string): void {
    this.calendarService.changeMonth(action);
  }

  // getInfoDay(day: number) {
  // }
}
