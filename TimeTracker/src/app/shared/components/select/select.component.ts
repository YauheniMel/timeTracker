import {
  Component, ElementRef, Input, OnInit, ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() value = 0;

  freeTime!: number[];

  choice = 1;

  lastScrollPosition:any;

  @ViewChild('select') select!:ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.freeTime = Array(24).fill(0).map((x, i) => ++i);
  }

  scr(value: string) {
    this.choice = +value;
  }
}
