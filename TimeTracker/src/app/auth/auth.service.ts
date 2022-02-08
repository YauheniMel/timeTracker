import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface LoginData {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(
    private snackBar: MatSnackBar,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  registration({ email, password }: LoginData): void {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.snackBar.open('Registration successful', 'Close', {
          duration: 1000,
          panelClass: ['succes'],
          verticalPosition: 'top',
        });

        this.router.navigate(['']);
      })
      .catch((err) => {
        this.snackBar.open(err.message, 'Close', {
          panelClass: ['warning'],
          verticalPosition: 'top',
        });
      });
  }

  login({ email, password }: LoginData) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.snackBar.open('Authorisation was successful!', 'Close', {
          duration: 1000,
          panelClass: ['succes'],
          verticalPosition: 'top',
        });

        this.router.navigate(['timetracker']);
      })
      .catch((err) => {
        this.snackBar.open(err.message, 'Close', {
          panelClass: ['warning'],
          verticalPosition: 'top',
        });
      });
  }
}
