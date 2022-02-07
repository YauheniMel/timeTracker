import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group(
      {
        firstName: [null, [Validators.required, Validators.minLength(3)]],
        lastName: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, Validators.required],
      },
      { validator: this.compairValidator('password', 'confirmPassword') }
    );
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.snackBar.open('Form is not valid!', 'Close', {
        duration: 1000,
        panelClass: ['warning'],
        verticalPosition: 'top',
      });
    }

    this.authService.registration(this.registerForm.value);
  }

  compairValidator(
    controlName: string,
    confirmControlName: string
  ): ValidationErrors {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const confirmControl = formGroup.controls[confirmControlName];
      if (confirmControl.errors) {
        return;
      }
      if (control.value !== confirmControl.value) {
        confirmControl.setErrors({ compairValidator: true });
      } else {
        confirmControl.setErrors(null);
      }
    };
  }
}
