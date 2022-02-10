import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  panelOpenState = false;

  @Input() dayOfMonth!: number;

  @Input() dateToday!: Date;

  constructor() {}

  ngOnInit(): void {}
}
