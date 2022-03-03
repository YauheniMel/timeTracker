import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, first, map, Observable, of, take, tap } from 'rxjs';

import { InfoDay } from '../shared/types/info-day.interface';

@Injectable()
export class DatabaseService {
  constructor(
    private database: AngularFireDatabase,
    private snackBar: MatSnackBar
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
    // doesn't need
    return (error: any): Observable<T> => {
      this.snackBar.open(`${operation} failed: ${error.message}`, 'Close', {
        duration: 1000,
        panelClass: ['warning'],
        verticalPosition: 'top'
      });

      return of(result as T);
    };
  }

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

  setTask(formData: FormGroup, info: InfoDay): void {
    const user = getAuth().currentUser;

    this.checkDb(info.year, info.month, info.day)
      .pipe(
        first(),
        map(() => {
          const { fromTimeCtrl, toTimeCtrl, descriptionCtrl } = formData.value;

          const freeTime = info.freeTime.filter(
            (item) => !(item >= fromTimeCtrl && item < toTimeCtrl)
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
              description: descriptionCtrl
            })
          };
        }),
        tap(() => {
          this.snackBar.open('The task was created successfully', 'Close', {
            duration: 1000,
            panelClass: ['successfully'],
            verticalPosition: 'top'
          });
        }),
        catchError(this.handleError<any>('Set task'))
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
                res
              );
          });
      });
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
}
