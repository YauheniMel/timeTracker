import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/core/auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { RegisterActions } from './register.action';

@Injectable()
export class RegisterEffect {
  register$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.registerRequest),
      switchMap(({ payload }) =>
        this.authService.registration(payload).pipe(
          map((res) => {
            const profile = {
              firstName: payload.firstName,
              lastName: payload.lastName
            };
            this.database.list('users').set(res.user.uid, { profile });

            return RegisterActions.registerSuccess({ isAuth: true });
          }),
          tap(() => {
            this.snackBar.open('Registration successful', 'Close', {
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
            return of(RegisterActions.registerFailure());
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
