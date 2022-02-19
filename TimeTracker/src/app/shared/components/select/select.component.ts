import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  @Input() freeTime!: number[] | null;

  @Input() type!: 'from' | 'to';

  choice: null | number = null;

  @ViewChild('select') select!: ElementRef;

  @Output() selected = new EventEmitter<number>();

  allTime: number[] = Array.from(Array(25).keys()); // need pass it

  touched = false;

  onTouched = () => {};

  onChange = (time: number) => {};

  constructor() {}

  ngOnInit(): void {}

  makeChoice() {
    // need fix choice's time
    this.markAsTouched();
    if (this.type === 'from') {
      setTimeout(() => {
        this.choice = this.select.nativeElement.scrollTop / 80;
        this.onChange(this.choice);
        this.selected.emit(this.choice);
      }, 1000);
    } else if (this.type === 'to') {
      setTimeout(() => {
        this.choice = this.select.nativeElement.scrollTop / 80 + 1;
        this.onChange(this.choice);
      }, 1000);
    }
  }

  writeValue(time: number) {
    this.choice = time;
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
      this.makeChoice();
    } else if (action === 'minus') {
      this.select.nativeElement.scrollTop += 80;
      this.makeChoice();
    }
  }
}
