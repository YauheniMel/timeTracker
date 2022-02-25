import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DatabaseService } from 'src/app/core/database.service';
import { User } from './user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  user!: User;

  subscribe!: any;

  constructor(
    private database: DatabaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscribe = this.database.getDbProfile().subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
