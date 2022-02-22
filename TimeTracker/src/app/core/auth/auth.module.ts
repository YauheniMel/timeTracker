import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthRoutingModule } from './auth-routing.module';

import { RegisterPageComponent } from '../../feature/components/register-page/register-page.component';
import { AuthService } from './auth.service';
import { LoginPageComponent } from '../../feature/components/login-page/login-page.component';

@NgModule({
  declarations: [RegisterPageComponent, LoginPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
