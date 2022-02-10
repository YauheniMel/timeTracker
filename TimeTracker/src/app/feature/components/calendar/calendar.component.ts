import { Component, OnInit } from '@angular/core';
// import { DateTime } from 'luxon';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  daysInMonth!: number[];

  date!: Date;

  constructor() { }

  ngOnInit(): void {
    this.getDate();
  }

  getDate(): void {
    this.daysInMonth = Array(31).fill(0).map((x, i) => i + 1);

    this.date = new Date();
  }
}
