import { Component, OnInit } from '@angular/core';

import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(
    public calendarService: CalendarService,
  ) {}

  ngOnInit(): void {
    this.calendarService.setDaysInMonth();
    this.calendarService.setFirstDay();
  }

  changeMonth(action: string): void {
    this.calendarService.changeMonth(action);
  }
}
