import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {
  @Input() dayOfMonth!: number;

  @Input() strokeDashIn!: string;

  @Input() strokeDashOut!: string;

  @Output() getDay: EventEmitter<number> = new EventEmitter();

  @Input() toDos!: { day: number; toDosCount: number | null };

  onClick() {
    this.getDay.emit(this.dayOfMonth);
  }
}
