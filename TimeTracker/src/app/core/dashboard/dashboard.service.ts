import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  logout(): void {
    this.angularFireAuth.signOut()
      .then(() => this.router.navigate(['']))
      .catch((err) => alert(err.message));
  }
}
