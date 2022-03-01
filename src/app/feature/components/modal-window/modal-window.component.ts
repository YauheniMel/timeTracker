import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatabaseService } from 'src/app/core/database.service';
import { InfoDay } from 'src/app/shared/types/info-day.interface';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  isLinear = false;

  formGroup!: FormGroup;

  day!: InfoDay;

  freeTimeTo!: number[];

  freeTimeFrom!: number[];

  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  constructor(
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: InfoDay,
    private database: DatabaseService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.day = this.data;

    if (this.day.freeTime) {
      this.freeTimeFrom = this.day.freeTime.filter((item) => item < 24);
    }
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      descriptionCtrl: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(300)
        ]
      ],
      fromTimeCtrl: ['', Validators.required],
      toTimeCtrl: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.formGroup.invalid) {
      this.snackBar.open('Form is not valid!', 'Close', {
        duration: 1000,
        panelClass: ['warning'],
        verticalPosition: 'top'
      });

      return;
    }

    this.database.setTask(this.formGroup, this.day);
    this.dialog.closeAll();
  }

  getFreeTimeTo(choice: number): void {
    this.freeTimeTo = [];

    for (let i = 0; i < this.freeTimeFrom.length; i++) {
      if (this.freeTimeFrom[i] >= choice) {
        if (this.freeTimeFrom[i + 1] - this.freeTimeFrom[i] !== 1) {
          this.freeTimeTo.push(this.freeTimeFrom[i] + 1);

          break;
        }
        this.freeTimeTo.push(this.freeTimeFrom[i] + 1);
      }
    }
  }
}
