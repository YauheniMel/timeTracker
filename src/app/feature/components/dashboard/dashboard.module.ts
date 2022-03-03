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
import { LogoutEffect } from 'src/app/core/store/effects/logout.effect';
import { DashboardEffect } from 'src/app/core/store/effects/dashboard.effect';
import { CalendarEffect } from 'src/app/core/store/effects/calendar.effect';
import { DashboardComponent } from './dashboard.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarService } from '../../services/calendar.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import * as fromAuth from '../../../core/store/reducers/dashboard.reducer';
import * as fromCalendar from '../../../core/store/reducers/calendar.reducer';

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
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.dashboardReducers),
    StoreModule.forFeature(
      fromCalendar.calendarFeatureKey,
      fromCalendar.calendarReducers
    ),
    EffectsModule.forFeature([LogoutEffect, DashboardEffect, CalendarEffect])
  ],
  providers: [CalendarService]
})
export class DashboardModule {}
