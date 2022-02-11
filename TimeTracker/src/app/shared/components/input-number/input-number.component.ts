import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
})
export class InputNumberComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  click(value: any) {
    if (value.deltaY > 0) {
      console.log('+++');
    } else if (value.deltaY < 0) {
      console.log('---');
    }
  }
}
