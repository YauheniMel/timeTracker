import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { InfoDay } from 'src/app/shared/components/day/info-day.interface';

import { CalendarService } from '../../services/calendar.service';

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

  daysInMonth!: number;

  move!: string;

  show: boolean = true;

  infoMonth!: InfoDay[];

  toDosInfo: Array<{ day: number; toDosCount: number | null }> = [];

  styles: { day: number; styleIn: string; styleOut: string }[] = [];

  ngOnInit(): void {
    this.daysInMonth = this.calendarService.targetMonth.daysInMonth;

    this.calendarService.setFirstDay();

    this.setDefaultStyle();

    this.database
      .getDbByParameter(
        this.calendarService.targetMonth.year,
        this.calendarService.targetMonth.month
      )
      .subscribe((res) => {
        this.infoMonth = res;
        this.setStyle();
        this.countToDos();
      });
  }

  changeMonth(action: string): void {
    this.calendarService.changeMonth(action);

    // for animation
    this.move = action;
    this.show = false;
    setTimeout(() => {
      this.show = true;
    });
    //

    this.daysInMonth = this.calendarService.targetMonth.daysInMonth;

    this.setDefaultStyle();

    this.database
      .getDbByParameter(
        this.calendarService.targetMonth.year,
        this.calendarService.targetMonth.month
      )
      .subscribe((res) => {
        this.infoMonth = res;
        this.setStyle();
        this.countToDos();
      });
  }

  setDefaultStyle() {
    this.styles = Array.apply(null, Array(this.daysInMonth)).map((_, i) => ({
      day: ++i,
      styleIn: `154${',10.5,0'.repeat(12)}`,
      styleOut: `188${',13.1,0'.repeat(12)}`,
    }));
  }

  setStyle() {
    if (this.infoMonth.length) {
      this.infoMonth.forEach((item) => {
        const allTime = Array.from(Array(24).keys());
        const busyTime = allTime.filter(
          (time) => !item.freeTime?.includes(time)
        );

        const style = {
          day: item.day,
          styleIn: `154${',10.5,0'.repeat(12)}`,
          styleOut: `188${',13.1,0'.repeat(12)}`,
        };
        let index: number;
        this.styles.forEach((defaultStyle, i) => {
          if (item.day === defaultStyle.day) {
            index = i;
          }
        });

        const arrIn = style.styleIn.match(/10.5,0/g) as RegExpMatchArray;
        const arrOut = style.styleOut.match(/13.1,0/g) as RegExpMatchArray;

        if (style.day === item.day) {
          busyTime.forEach((time) => {
            if (time < 12) {
              arrIn![time] = '0,10.5';
            } else {
              arrOut![time - 12] = '0,13.1';
            }
          });
        }

        style.styleIn = `154,${arrIn.join()}`;
        style.styleOut = `188,${arrOut.join()}`;

        this.styles[index!] = style;
      });
    }
  }

  countToDos() {
    this.toDosInfo = [];

    for (let i = 1; i <= this.daysInMonth; i += 1) {
      const [toDo] = this.infoMonth.filter((item) => item.day === i);

      this.toDosInfo.push(
        toDo
          ? { day: toDo.day, toDosCount: toDo.toDos!.length }
          : { day: i, toDosCount: null }
      );
    }
  }
}
