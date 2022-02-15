import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  constructor(
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: InfoDay,
    private database: DatabaseService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.day = this.data;

    this.formGroup = this.formBuilder.group({
      discriptionCtrl: ['', Validators.minLength(3)],
      fromTimeCtrl: ['', Validators.required],
      toTimeCtrl: ['', Validators.required],
    }, { validator: this.selectsValidator('fromTimeCtrl', 'toTimeCtrl') });
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

    this.database.setTask(this.formGroup.value, this.day);
  }

  selectsValidator(
    fromName: string,
    toName: string,
  ): ValidationErrors {
    debugger;

    return (formGroup: FormGroup) => {
      const controlFrom = formGroup.controls[fromName];
      const controlTo = formGroup.controls[toName];

      if (controlTo.errors) {
        return;
      }
      if (controlFrom.value > controlTo.value) {
        controlTo.setErrors({ selectsValidator: true });
      } else {
        controlTo.setErrors(null);
      }
    };
  }
}
