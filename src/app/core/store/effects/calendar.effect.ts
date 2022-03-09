import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap, take } from 'rxjs/operators';
import { Observable, of, first } from 'rxjs';
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
        this.database.getDatabase(payload.year, payload.month).pipe(
          first(),
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

  task$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarActions.taskRequest),
      switchMap(({ payload }) => {
        const { year, month, day } = payload;
        return this.database.checkDb(year, month, day).pipe(
          take(1),
          map((res) => {
            const { from, to } = payload.toDo;
            const freeTime = payload.freeTime.filter(
              (item: number) => !(item >= from && item < to)
            );

            const { toDo } = payload;

            return {
              month,
              year,
              day,
              freeTime,
              toDos: (Array.isArray(res[3]) ? [...res[3], toDo] : [toDo]) as {
                from: number;
                to: number;
                description: string;
              }[]
            };
          }),
          switchMap((infoTasks) =>
            this.database.setTask(infoTasks).pipe(
              take(1),
              map(() => CalendarActions.taskSuccess({ infoTasks })),
              tap(() => {
                this.snackBar.open(
                  'The task was created successfully',
                  'Close',
                  {
                    duration: 1000,
                    panelClass: ['successfully'],
                    verticalPosition: 'top'
                  }
                );
              }),
              catchError((err) => {
                this.snackBar.open(err.message, 'Close', {
                  duration: 1000,
                  panelClass: ['warning'],
                  verticalPosition: 'top'
                });

                return of(CalendarActions.taskFailure());
              })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private database: DatabaseService
  ) {}
}
