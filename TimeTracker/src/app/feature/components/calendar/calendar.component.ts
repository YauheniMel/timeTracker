import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { DatabaseService } from 'src/app/core/database.service';

import { InfoDay } from 'src/app/shared/components/day/info-day.interface';

import { CalendarService } from '../services/calendar.service';
import { InfoMonth } from './info-month.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  infoMonth!: InfoMonth | { month: number; year: number; listOfDays: null };

  dayInfo!: InfoDay;

  constructor(
    private database: DatabaseService,
    public calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.calendarService.setDaysInMonth();
    this.calendarService.setFirstDay();

    this.database
      .getDbByParameter(
        this.calendarService.targetMonth.year,
        this.calendarService.targetMonth.month
      )
      .subscribe((res) => {
        [this.infoMonth] = res; // need use
      });
  }

  changeMonth(action: string): void {
    this.calendarService.changeMonth(action);

    this.database
      .getDbByParameter(
        this.calendarService.targetMonth.year,
        this.calendarService.targetMonth.month
      )
      .subscribe((res) => {
        [this.infoMonth] = res; // need use
      });
  }

  getDayInfo(day: number): void {
    this.database
      .getDbByParameter(
        this.calendarService.targetMonth.year,
        this.calendarService.targetMonth.month,
        day
      )
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

        this.calendarService.openDialog(this.dayInfo);
      });
  }

  getInitDayInfo(day: number) {
    return {
      day,
      freeTime: Array.from(Array(24).keys()),
      month: this.calendarService.targetMonth.month,
      year: this.calendarService.targetMonth.year,
      toDos: null,
    };
  }
}
