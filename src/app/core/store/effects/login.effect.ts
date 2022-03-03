import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginActions } from '../actions/login.action';

@Injectable()
export class LoginEffect {
  login$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginRequest),
      switchMap(({ payload }) =>
        this.authService.login(payload).pipe(
          map(() => LoginActions.loginSuccess({ isAuth: true })),
          tap(() => {
            this.snackBar.open('Authentication successful!', 'Close', {
              duration: 1000,
              panelClass: ['successfully'],
              verticalPosition: 'top'
            });

            this.router.navigate(['timetracker']);
          }),
          catchError((err) => {
            this.snackBar.open(err.message, 'Close', {
              duration: 1000,
              panelClass: ['warning'],
              verticalPosition: 'top'
            });
            return of(LoginActions.loginFailure());
          })
        )
      )
    )
  );

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private snackBar: MatSnackBar,
    private database: AngularFireDatabase
  ) {}
}
