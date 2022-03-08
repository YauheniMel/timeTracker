import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/core/auth/auth.service';
import { LogoutActions } from '../actions/logout.action';

@Injectable()
export class LogoutEffect {
  logout$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(LogoutActions.logoutRequest),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => LogoutActions.logoutSuccess({ isAuth: false })),
          tap(() => this.router.navigate([''])),
          catchError((err) => {
            this.snackBar.open(err.message, 'Close', {
              duration: 1000,
              panelClass: ['warning'],
              verticalPosition: 'top'
            });
            return of(LogoutActions.logoutFailure());
          })
        )
      )
    )
  );

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
}
