import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FeatureRoutingModule } from './feature-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardService } from './components/services/dashboard.service';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { SelectComponent } from '../shared/components/select/select.component';
import { CalendarService } from './components/services/calendar.service';

@NgModule({
  declarations: [
    DashboardComponent,
    CalendarComponent,
    ModalWindowComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    FeatureRoutingModule,
    SharedModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSliderModule,
  ],
  providers: [DashboardService, CalendarService],
})
export class FeatureModule {}
