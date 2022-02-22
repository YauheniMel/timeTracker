import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { DashboardService } from '../services/dashboard.service';

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

  constructor(
    private dashboardService: DashboardService,
    private db: DatabaseService
  ) {}

  ngOnInit(): void {
    this.db.getDbProfile().subscribe((response) => {
      this.user = {
        firstName: response[0],
        lastName: response[1],
      };
    });
  }

  logout(): void {
    this.dashboardService.logout();
  }
}
