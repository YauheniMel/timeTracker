import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DashboardActions } from 'src/app/core/store/actions/dashboard.action';
import { LoginActions } from 'src/app/core/store/actions/login.action';
import { LogoutActions } from 'src/app/core/store/actions/logout.action';
import { profileSelector } from 'src/app/core/store/selectors/dashboard.selector';
import { DashboardInterface } from 'src/app/shared/types/store.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user$!: Observable<DashboardInterface>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(LoginActions.loginSuccess({ isAuth: true }));
    this.store.dispatch(DashboardActions.getUser());

    this.user$ = this.store.pipe(select(profileSelector));
  }

  logout(): void {
    this.store.dispatch(LogoutActions.logoutRequest());
  }
}
