import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

interface User {
  firstName: string;
  lastName: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user!: User;

  time!: Date;

  constructor(
    private dashboardService: DashboardService,
  ) {}

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  ngOnInit(): void {
    this.setTime();
    this.dashboardService.getUserData().subscribe((response) => {
      this.user = response.data();
    });
  }

  logout(): void {
    this.dashboardService.logout();
  }

  setTime() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
}