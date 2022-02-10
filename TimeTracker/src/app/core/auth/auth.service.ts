import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
@Injectable()
export class AuthService {
  constructor(
    private snackBar: MatSnackBar,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private databaseService: DatabaseService
  ) {}

  registration({ email, password, firstName, lastName }: RegisterData): void {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.snackBar.open('Registration successful', 'Close', {
          duration: 1000,
          panelClass: ['succes'],
          verticalPosition: 'top',
        });

        this.databaseService.setUser(firstName, lastName).catch((err) => {
          this.snackBar.open(err.message, 'Close', {
            duration: 1000,
            panelClass: ['warning'],
            verticalPosition: 'top',
          });
        }); // need check only errors
      })
      .then(() => this.router.navigate(['']))
      .catch((err) => {
        this.snackBar.open(err.message, 'Close', {
          panelClass: ['warning'],
          verticalPosition: 'top',
        });
      });
  }

  login({ email, password }: LoginData) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.snackBar.open('Authorisation was successful!', 'Close', {
          duration: 1000,
          panelClass: ['succes'],
          verticalPosition: 'top',
        });
      })
      .then(() => this.router.navigate(['timetracker']))
      .catch((err) => {
        this.snackBar.open(err.message, 'Close', {
          panelClass: ['warning'],
          verticalPosition: 'top',
        });
      });
  }

  addNewUser(firstName: string, lastName: string) {
    const user = getAuth().currentUser;

    if (user) {
      this.db.collection('users').doc(user.uid).set({
        firstName,
        lastName,
      });
    }
  }
}
