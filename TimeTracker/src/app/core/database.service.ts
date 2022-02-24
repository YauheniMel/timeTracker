import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  catchError, first, map, Observable, of, take,
} from 'rxjs';
import { InfoDay } from '../shared/components/day/info-day.interface';

@Injectable()
export class DatabaseService {
  constructor(
    private database: AngularFireDatabase,
    private snackBar: MatSnackBar,
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.snackBar.open(`${operation} failed: ${error.message}`, 'Close', {
        duration: 1000,
        panelClass: ['warning'],
        verticalPosition: 'top',
      });

      return of(result as T);
    };
  }

  setUser(firstName: string, lastName: string): Promise<void> {
    const user = getAuth().currentUser;

    const profile: { firstName: string; lastName: string } = {
      firstName,
      lastName,
    };

    return this.database.list('users').set(user!.uid, {
      profile,
    });
  }

  getDbProfile(): Observable<any> {
    const user = getAuth().currentUser;
    return this.database
      .list(`users/${user!.uid}/profile`)
      .valueChanges()
      .pipe(
        map((res) => ({ firstName: res[0], lastName: res[1] })),
        catchError(this.handleError<any>('Get User info')),
      );
  }

  checkDb(day: number, month: number, year: number): Observable<any> {
    const user = getAuth().currentUser;

    return this.database
      .list(`users/${user!.uid}/listOfYears/${year}/${month}/${day}`)
      .valueChanges();
  }

  setTask(formData: FormGroup, info: InfoDay): void {
    const user = getAuth().currentUser;

    this.checkDb(info.day, info.month, info.year)
      .pipe(
        first(),
        map(() => {
          const { fromTimeCtrl, toTimeCtrl, discriptionCtrl } = formData.value;

          const freeTime = info.freeTime!.filter(
            (item) => !(item >= fromTimeCtrl && item < toTimeCtrl),
          );

          const { day, month, year } = info;
          let { toDos } = info;
          if (!toDos) toDos = [];

          return {
            month,
            year,
            day,
            freeTime,
            toDos: toDos!.concat({
              from: fromTimeCtrl,
              to: toTimeCtrl,
              discription: discriptionCtrl,
            }),
          };
        }),
        catchError(this.handleError<any>('Set task')),
      )
      .subscribe((res) => {
        this.database
          .list(`users/${user!.uid}/listOfYears`)
          .valueChanges()
          .pipe(take(1))
          .subscribe(() => {
            this.database
              .list('users')
              .update(
                `${user!.uid}/listOfYears/${info.year}/${info.month}/${
                  info.day
                }`,
                res,
              );
          });
      });
  }

  getDbByParameter(
    year: number | null = null,
    month: number | null = null,
    day: number | null = null,
  ): Observable<any> {
    const user = getAuth().currentUser;

    if (day && month && year) {
      return this.database
        .list(`users/${user!.uid}/listOfYears/${year}/${month}/${day}`)
        .valueChanges();
    }

    if (!day && month && year) {
      return this.database
        .list(`users/${user!.uid}/listOfYears/${year}/${month}`)
        .valueChanges();
    }

    return this.database.list(`users/${user!.uid}/listOfYears`).valueChanges();
  }
}
