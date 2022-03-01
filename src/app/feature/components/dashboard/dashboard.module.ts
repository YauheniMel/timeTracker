import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { LogoutEffect } from 'src/app/core/auth/store/logout.effect';
import { DashboardComponent } from './dashboard.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarService } from '../../services/calendar.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import * as fromAuth from '../../../core/auth/store/auth.reducer';

@NgModule({
  declarations: [DashboardComponent, CalendarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    SharedModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([LogoutEffect])
  ],
  providers: [CalendarService]
})
export class DashboardModule {}
