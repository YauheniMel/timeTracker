import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DatabaseService } from 'src/app/core/database.service';
import { LoginActions } from 'src/app/core/store/actions/login.action';
import { DashboardActions } from '../actions/dashboard.action';

@Injectable()
export class DashboardEffect {
  dashboard$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.getUser),
      switchMap(() =>
        this.database.getDbProfile().pipe(
          map((res) => {
            const [firstName, lastName] = res;

            const profile = {
              firstName,
              lastName
            };
            return DashboardActions.getUserSuccess({ profile });
          }),
          catchError((err) => {
            this.snackBar.open(err.message, 'Close', {
              duration: 1000,
              panelClass: ['warning'],
              verticalPosition: 'top'
            });
            return of(LoginActions.loginFailure({ isAuth: false })); // stranger action
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
