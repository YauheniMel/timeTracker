import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { LoginActions } from 'src/app/core/store/actions/login.action';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  authForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.snackBar.open('Form is not valid!', 'Close', {
        duration: 1000,
        panelClass: ['warning'],
        verticalPosition: 'top'
      });

      return;
    }

    const payload = {
      email: this.authForm.value.email,
      password: this.authForm.value.password
    };

    this.store.dispatch(LoginActions.loginRequest({ payload }));
  }
}
