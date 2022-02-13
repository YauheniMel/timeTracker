import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoDay } from 'src/app/shared/components/day/info-day.interface';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit {
  isLinear = false;

  firstFormGroup!: FormGroup;

  secondFormGroup!: FormGroup;

  dayInfo: InfoDay | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: InfoDay | undefined,
  ) {
  }

  ngOnInit() {
    if (this.data) {
      const [, data] = Object.entries(this.data)[0]; // make it easier

      this.dayInfo = data;
    }

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
}
