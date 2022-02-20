import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatabaseService } from 'src/app/core/database.service';
import { InfoDay } from 'src/app/shared/components/day/info-day.interface';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
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
      this.freeTimeFrom = this.day.freeTime?.filter((item) => item < 24);
    }

    this.formGroup = this.formBuilder.group(
      {
        discriptionCtrl: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(300),
          ],
        ],
        fromTimeCtrl: ['', Validators.required],
        toTimeCtrl: ['', Validators.required],
      },
      { validator: this.selectsValidator('fromTimeCtrl', 'toTimeCtrl') }
    );
  }

  submit(): void {
    if (this.formGroup.invalid) {
      this.snackBar.open('Form is not valid!', 'Close', {
        duration: 1000,
        panelClass: ['warning'],
        verticalPosition: 'top',
      });

      return;
    }

    this.snackBar.open('The task was created successfully', 'Close', {
      duration: 1000, // early
      panelClass: ['succes'],
      verticalPosition: 'top',
    });

    this.database.setTask(this.formGroup, this.day);
    this.dialog.closeAll();
  }

  selectsValidator(fromName: string, toName: string): ValidationErrors {
    return (formGroup: FormGroup) => {
      const controlFrom = formGroup.controls[fromName];
      const controlTo = formGroup.controls[toName];

      if (controlTo.errors) {
        return;
      }

      const indexFrom = (this.day.freeTime as number[]).indexOf(
        controlFrom.value
      );
      const indexTo = (this.day.freeTime as number[]).indexOf(controlTo.value);

      const interval = this.day.freeTime!.slice(indexFrom, indexTo);

      if (controlFrom.value >= controlTo.value) {
        controlTo.setErrors({ selectsValidator: true });
      } else if (controlTo.value - controlFrom.value !== interval.length) {
        controlTo.setErrors({ selectsValidator: true });
      } else {
        controlTo.setErrors(null);
      }
    };
  }

  getFreeTimeTo(choice: number): void {
    this.freeTimeTo = [];
    this.freeTimeFrom.forEach((item) => {
      if (item >= choice) {
        if (item + 1 - this.freeTimeTo[this.freeTimeTo.length - 1] > 1) {
          return;
        }
        this.freeTimeTo.push(item + 1);
      }
    });
  }
}
