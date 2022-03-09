import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { RegisterActions } from 'src/app/core/store/actions/register.action';
import { CustomValidators } from 'src/app/shared/custom.validators';
import { RegisterInterface } from 'src/app/shared/types/auth.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: [null, [Validators.required, Validators.minLength(3)]],
        lastName: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, Validators.required]
      },
      {
        validator: CustomValidators.compareValidator(
          'password',
          'confirmPassword'
        )
      }
    );
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.snackBar.open('Form is not valid!', 'Close', {
        duration: 1000,
        panelClass: ['warning'],
        verticalPosition: 'top'
      });

      return;
    }

    const payload: RegisterInterface = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email
    };

    this.store.dispatch(RegisterActions.registerRequest({ payload }));
  }
}
