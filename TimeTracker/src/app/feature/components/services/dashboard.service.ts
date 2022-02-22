import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  catchError, Observable, of, tap,
} from 'rxjs';

@Injectable()
export class DashboardService {
  constructor(
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
}
