import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { from, Observable } from 'rxjs';

@Injectable()
export class DatabaseService {
  constructor(private database: AngularFireDatabase) {}

  getDbProfile(): Observable<any> {
    const user = getAuth().currentUser;

    return this.database.list(`users/${user!.uid}/profile`).valueChanges();
  }

  checkDb(year: number, month: number, day: number): Observable<any> {
    // need to check into store
    const user = getAuth().currentUser;

    return this.database
      .list(`users/${user!.uid}/listOfYears/${year}/${month}/${day}`)
      .valueChanges();
  }

  setTask(tasks: any): Observable<any> {
    const user = getAuth().currentUser;

    return DatabaseService.fromFirebaseAuthPromise(
      this.database
        .list('users')
        .update(
          `${user!.uid}/listOfYears/${tasks.year}/${tasks.month}/${tasks.day}`,
          tasks
        )
    );
  }

  getDatabase(
    year: number | null = null,
    month: number | null = null
  ): Observable<any> {
    const user = getAuth().currentUser;

    return this.database
      .list(`users/${user!.uid}/listOfYears/${year}/${month}`)
      .valueChanges();
  }

  static fromFirebaseAuthPromise(promise: Promise<any>): Observable<any> {
    return from(<Promise<any>>promise);
  }
}
