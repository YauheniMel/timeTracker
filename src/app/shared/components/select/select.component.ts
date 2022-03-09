import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent)
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, AfterViewInit {
  @Input() freeTime!: number[];

  @Input() type!: 'from' | 'to';

  choice: null | number = null;

  @ViewChild('select') select!: ElementRef;

  @Output() selected = new EventEmitter<number>();

  touched = false;

  private onTouched = () => {};

  private onChange = (time: number) => {};

  ngAfterViewInit(): void {
    const scroll = fromEvent(this.select.nativeElement, 'scroll');
    const delay = 100;

    scroll.pipe(debounceTime(delay)).subscribe(() => {
      this.markAsTouched();
      this.choice = this.freeTime[this.select.nativeElement.scrollTop / 80];
      if (this.type === 'from') this.selected.emit(this.choice);

      this.writeValue(this.choice);
    });
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

  onClick(value: number) {
    this.markAsTouched();

    this.choice = value;

    if (this.type === 'from') this.selected.emit(value);

    this.writeValue(value);
  }

  changeSelect(action: 'increase' | 'decrease'): void {
    const heightOptionDOMElem = 80;

    if (!this.choice) this.choice = 0;
    if (action === 'increase') {
      this.select.nativeElement.scrollTop -= heightOptionDOMElem;
    } else if (action === 'decrease') {
      this.select.nativeElement.scrollTop += heightOptionDOMElem;
    }
  }
}
