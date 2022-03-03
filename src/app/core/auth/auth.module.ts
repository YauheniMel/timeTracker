import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RegisterEffect } from 'src/app/core/store/effects/register.effect';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterPageComponent } from '../../feature/components/register-page/register-page.component';
import { AuthService } from './auth.service';
import { LoginPageComponent } from '../../feature/components/login-page/login-page.component';
import * as fromAuth from '../store/reducers/auth.reducer';
import { LoginEffect } from '../store/effects/login.effect';

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
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducers),
    EffectsModule.forFeature([RegisterEffect, LoginEffect])
  ],
  providers: [AuthService]
})
export class AuthModule {}
