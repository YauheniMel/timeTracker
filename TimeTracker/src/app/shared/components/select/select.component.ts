import {
  Component, ElementRef, Input, OnInit, ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() freeTime!: any;

  choice: null | number = null;

  allTime: number[] = Array.from(Array(24).keys());

  lastScrollPosition: any;

  @ViewChild('select') select!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    console.log(this.freeTime);
  }

  makeChoice(value: string) {
    this.choice = +value;
  }
}
