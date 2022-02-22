import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DatabaseService } from 'src/app/core/database.service';

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
    private db: DatabaseService,
    private authService: AuthService,
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
    this.authService.logout();
  }
}
