import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {
  catchError, Observable, of, tap,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getUserData(): Observable<any> {
    const user = getAuth().currentUser;

    return this.db
      .doc(`users/${user?.uid}`)
      .get()
      .pipe(
        tap((snapshot) => snapshot.data()),
        catchError(this.handleError<any>('Get User')),
      );
  }

  logout(): void {
    this.angularFireAuth
      .signOut()
      .then(() => this.router.navigate(['']))
      .catch((err) => alert(err.message));
  }
}
