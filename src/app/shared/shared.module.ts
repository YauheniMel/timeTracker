import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DayComponent } from './components/day/day.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  declarations: [SelectComponent, DayComponent],
  imports: [CommonModule, MatBadgeModule, MatIconModule, MatButtonModule],
  exports: [SelectComponent, DayComponent]
})
export class SharedModule {}
