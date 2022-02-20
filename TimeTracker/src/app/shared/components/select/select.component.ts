import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent),
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() freeTime!: number[] | null;

  @Input() type!: 'from' | 'to';

  choice: null | number = null;

  @ViewChild('select') select!: ElementRef;

  @Output() selected = new EventEmitter<number>();

  allTime: number[] = Array.from(Array(25).keys()); // need pass it

  touched = false;

  private onTouched = () => {};

  private onChange = (time: number) => {};

  constructor() {}

  makeChoice() {
    // need improve. Many time
    if (this.type === 'from') {
      setTimeout(() => {
        this.markAsTouched();
        this.choice = Math.round(this.select.nativeElement.scrollTop / 80);
        this.selected.emit(this.freeTime![this.choice]);
        this.select.nativeElement.scrollTop = this.choice! * 80;
        this.select.nativeElement.value = this.freeTime![this.choice];
        this.writeValue(+this.select.nativeElement.value);
        this.choice = this.freeTime![this.choice];
      }, 400);
    } else if (this.type === 'to') {
      setTimeout(() => {
        this.choice = Math.round(
          this.select.nativeElement.scrollTop / 80 + this.freeTime![0]
        );
        this.select.nativeElement.scrollTop =
          (this.choice! - this.freeTime![0]) * 80;
        this.select.nativeElement.value =
          this.freeTime![this.choice - this.freeTime![0]];
        this.writeValue(+this.select.nativeElement.value);
      }, 400);
    }
  }

  writeValue(time: number) {
    this.onChange(time);
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
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

  changeSelect(action: 'plus' | 'minus'): void {
    if (!this.choice) this.choice = 0;
    if (action === 'plus') {
      this.select.nativeElement.scrollTop -= 80;
    } else if (action === 'minus') {
      this.select.nativeElement.scrollTop += 80;
    }
  }
}
