import { Component, Input, OnInit } from '@angular/core';
import { InfoDay } from './info-day.interface';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  panelOpenState = false;

  @Input() dayOfMonth!: number;

  @Input() dateToday!: Date;

  @Input() infoDay!: InfoDay | undefined;

  @Input() openDialog!: () => void;

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.openDialog();
  }
}
