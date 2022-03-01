import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogoutActions } from 'src/app/core/auth/store/logout.action';
import { DatabaseService } from 'src/app/core/database.service';
import { User } from '../../../shared/types/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user!: User;

  subscribe!: any;

  constructor(private database: DatabaseService, private store: Store) {}

  ngOnInit(): void {
    this.subscribe = this.database.getDbProfile().subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.store.dispatch(LogoutActions.logoutRequest());
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
