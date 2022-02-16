import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  @Input() dayOfMonth!: number;

  @Input() strokeDashIn!: string;

  @Input() strokeDashOut!: string;

  @Output() getDay: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.getDay.emit(this.dayOfMonth);
  }
}
