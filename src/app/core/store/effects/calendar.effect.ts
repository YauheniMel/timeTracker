import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DatabaseService } from 'src/app/core/database.service';
import { CalendarActions } from '../actions/calendar.action';

@Injectable()
export class CalendarEffect {
  calendar$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarActions.calendarRequest),
      switchMap(({ payload }) =>
        this.database.getDbByParameter(payload.year, payload.month).pipe(
          map((res) => {
            const infoMonth = {
              ...payload,
              listOfDays: [...res]
            };
            return CalendarActions.calendarSuccess({ infoMonth });
          }),
          catchError((err) => {
            this.snackBar.open(err.message, 'Close', {
              duration: 1000,
              panelClass: ['warning'],
              verticalPosition: 'top'
            });
            return of(CalendarActions.calendarFailure());
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private database: DatabaseService
  ) {}
}
