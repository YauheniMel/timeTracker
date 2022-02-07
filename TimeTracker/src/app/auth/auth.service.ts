import { Injectable } from '@angular/core';
import { AuthModule } from '@angular/fire/auth';

@Injectable({ providedIn: AuthModule })
export class AuthService {
  constructor() { }
}
