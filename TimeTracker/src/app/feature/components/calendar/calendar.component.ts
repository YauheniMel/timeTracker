import { Component, OnInit } from '@angular/core';

import { StoreService } from 'src/app/core/store/store.service';

import { CalendarService } from '../services/calendar.service';
import { InfoMonth } from './info-month.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  infoMonth!: InfoMonth | { month: number; year: number; listOfDays: null };

  constructor(
    private storeService: StoreService,
    public calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.calendarService.setDaysInMonth();
    this.calendarService.setFirstDay();

    this.infoMonth = this.storeService.getDetailsMonth(
      this.calendarService.targetMonth
    );
  }

  changeMonth(action: string): void {
    this.calendarService.changeMonth(action);

    this.infoMonth = this.storeService.getDetailsMonth(
      this.calendarService.targetMonth
    );
  }

  getDayInfo(day: number) {
    let dayInfo;

    if (this.infoMonth.listOfDays) {
      [dayInfo] = this.infoMonth.listOfDays.filter((elem) => {
        if (elem.day === day) {
          return elem;
        }
        return false;
      });
    } else {
      dayInfo = undefined;
    }

    this.calendarService.openDialog(dayInfo, this.infoMonth);
  }
}
