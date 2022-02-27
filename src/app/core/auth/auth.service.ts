import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { LoginData, RegisterData } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private snackBar: MatSnackBar,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private databaseService: DatabaseService
  ) {}

  registration({ email, password, firstName, lastName }: RegisterData): void {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.snackBar.open('Registration successful', 'Close', {
          duration: 1000,
          panelClass: ['successfully'],
          verticalPosition: 'top'
        });

        this.databaseService.setUser(firstName, lastName).catch((err) => {
          this.snackBar.open(err.message, 'Close', {
            duration: 1000,
            panelClass: ['warning'],
            verticalPosition: 'top'
          });
        }); // need check only errors
      })
      .then(() => this.router.navigate(['timetracker']))
      .catch((err) => {
        this.snackBar.open(err.message, 'Close', {
          panelClass: ['warning'],
          verticalPosition: 'top'
        });
      });
  }

  login({ email, password }: LoginData) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.snackBar.open('Authentication successful!', 'Close', {
          duration: 1000,
          panelClass: ['successfully'],
          verticalPosition: 'top'
        });
      })
      .then(() => this.router.navigate(['timetracker']))
      .catch((err) => {
        this.snackBar.open(err.message, 'Close', {
          panelClass: ['warning'],
          verticalPosition: 'top'
        });
      });
  }

  logout(): void {
    this.angularFireAuth
      .signOut()
      .then(() => this.router.navigate(['']))
      .catch((err) => {
        this.snackBar.open(err.message, 'Close', {
          panelClass: ['warning'],
          verticalPosition: 'top'
        });
      });
  }
}
