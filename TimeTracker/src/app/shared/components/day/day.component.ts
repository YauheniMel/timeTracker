import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InfoDay } from './info-day.interface';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  @Input() dayOfMonth!: number;

  @Input() infoDay!: InfoDay | undefined;

  @Output() getDay: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.getDay.emit(this.dayOfMonth);
  }
}
