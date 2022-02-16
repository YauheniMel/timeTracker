import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { InfoDay } from 'src/app/shared/components/day/info-day.interface';

import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(
    public calendarService: CalendarService,
    private database: DatabaseService
  ) {}

  move!: string;

  show: boolean = true;

  infoMonth!: InfoDay[];

  styles!: { day: number; styleIn: string; styleOut: string }[];

  styleCircleIn =
    '154,10.5,0,10.5,0,10.5,0,10.5,0,10.5,0,10.5,0,10.5,0,10.5,0,10.5,0,10.5,0,10.5,0,10.5,0';

  styleCircleOut =
    '188,13.1,0,13.1,0,13.1,0,13.1,0,13.1,0,13.1,0,13.1,0,13.1,0,13.1,0,13.1,0,13.1,0,13.1,0';

  ngOnInit(): void {
    this.calendarService.setDaysInMonth();
    this.calendarService.setFirstDay();

    this.styles = Array.apply(
      null,
      Array(this.calendarService.daysInMonth.length)
    ).map((_, index) => ({
      day: ++index,
      styleIn: this.styleCircleIn,
      styleOut: this.styleCircleOut,
    }));

    this.database
      .getDbByParameter(
        this.calendarService.targetMonth.year,
        this.calendarService.targetMonth.month
      )
      .subscribe((res) => {
        this.infoMonth = res;
        this.setStyle();
      });
  }

  changeMonth(action: string): void {
    this.calendarService.changeMonth(action);
    this.move = action; // for animation
    this.show = false;

    this.styles = Array.apply(
      null,
      Array(this.calendarService.daysInMonth.length)
    ).map((_, index) => ({
      day: ++index,
      styleIn: this.styleCircleIn,
      styleOut: this.styleCircleOut,
    }));

    this.database
      .getDbByParameter(
        this.calendarService.targetMonth.year,
        this.calendarService.targetMonth.month
      )
      .subscribe((res) => {
        this.infoMonth = res;
        this.show = true;
        this.setStyle();
      });
  }

  setStyle() {
    if (this.infoMonth.length) {
      this.infoMonth.forEach((item) => {
        const style = {
          day: item.day,
          styleIn: '',
          styleOut: '',
        };

        if (item.freeTime) {
          const arrIn: RegExpMatchArray = this.styleCircleIn.match(
            /10.5,0/g
          ) as RegExpMatchArray;
          const arrOut: RegExpMatchArray = this.styleCircleOut.match(
            /13.1,0/g
          ) as RegExpMatchArray;

          const allTime = Array.from(Array(24).keys());
          const busyTime = allTime.reduce((acc, elem) => {
            if (!item.freeTime!.includes(elem)) {
              (acc as number[]).push(elem);
            }
            return acc;
          }, []);

          busyTime.forEach((time) => {
            if (time < 12) {
              arrIn[time] = '0,10.5';
            } else {
              arrOut[time - 12] = '0,13.1';
            }
          });

          style.styleIn = `154,${arrIn.join()}`;
          style.styleOut = `188,${arrOut.join()}`;
        } else {
          style.styleIn = '280';

          style.styleOut = '345';
        }

        this.styles.splice(--item.day, 1, style);
      });
    }
  }
}
