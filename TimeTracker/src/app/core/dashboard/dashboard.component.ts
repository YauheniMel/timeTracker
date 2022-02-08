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

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getUserData().subscribe((response) => {
      this.user = response.data();
    });
  }

  logout(): void {
    this.dashboardService.logout();
  }
}
