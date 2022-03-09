import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CalendarActions } from 'src/app/core/store/actions/calendar.action';
import { calendarMonthSelector } from 'src/app/core/store/selectors/calendar.selector';
import { InfoDay } from 'src/app/shared/types/info-day.interface';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor(public calendarService: CalendarService, private store: Store) {}

  daysInMonth!: number;

  move!: string;

  show: boolean = true;

  listOfDays$!: Observable<InfoDay[]>;

  toDosInfo: Array<{ day: number; toDosCount: number | null }> = [];

  styles: { day: number; styleIn: string; styleOut: string }[] = [];

  ngOnInit(): void {
    this.daysInMonth = this.calendarService.targetMonth.daysInMonth;

    this.calendarService.setFirstDay();

    this.getInfoMonth();

    this.initializeListOfDays();
  }

  initializeListOfDays() {
    this.listOfDays$ = this.store.pipe(select(calendarMonthSelector));

    this.listOfDays$.subscribe((listOfDays) => {
      this.setDefaultStyle();

      this.setStyle(listOfDays);
      this.countToDos(listOfDays);
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

    this.getInfoMonth();

    this.initializeListOfDays();
  }

  getInfoMonth(): void {
    const payload = {
      month: this.calendarService.targetMonth.month,
      year: this.calendarService.targetMonth.year
    };

    this.store.dispatch(CalendarActions.calendarRequest({ payload }));
  }

  setDefaultStyle() {
    this.styles = Array(this.daysInMonth)
      .fill(null)
      .map((_, idx) => ({
        day: idx + 1,
        styleIn: `154${',10.5,0'.repeat(12)}`,
        styleOut: `188${',13.1,0'.repeat(12)}`
      }));
  }

  setStyle(listOfDays: InfoDay[]) {
    if (listOfDays.length) {
      listOfDays.forEach((item) => {
        const hoursInDay = 24;

        const allTime = Array.from(Array(hoursInDay).keys());
        const busyTime = allTime.filter(
          (time) => !item.freeTime?.includes(time)
        );

        const style = {
          day: item.day,
          styleIn: `154${',10.5,0'.repeat(12)}`,
          styleOut: `188${',13.1,0'.repeat(12)}`
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

  countToDos(listOfDays: InfoDay[]) {
    this.toDosInfo = [];

    for (let i = 1; i <= this.daysInMonth; i++) {
      const [toDo] = listOfDays.filter((item) => item.day === i);

      this.toDosInfo.push(
        toDo
          ? { day: toDo.day, toDosCount: toDo.toDos!.length }
          : { day: i, toDosCount: null }
      );
    }
  }
}
