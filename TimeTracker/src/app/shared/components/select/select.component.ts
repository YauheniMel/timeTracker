import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent,
    },
  ],
})
export class SelectComponent implements OnInit {
  @Input() freeTime!: any;

  choice: null | number = null;

  allTime: number[] = Array.from(Array(24).keys()); // need pass it

  touched = false;

  onTouched = () => {};

  time = 0;

  onChange = (time: number) => {};

  constructor() {}

  ngOnInit(): void {
    console.log(this.freeTime);
  }

  makeChoice(value: number) {
    this.markAsTouched();

    this.onChange(value);

    this.choice = +value;
  }

  writeValue(time: number) {
    this.time = time;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  onAdd() {
    this.time += this.choice!;
    this.onChange(this.time);
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
