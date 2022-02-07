import { Injectable } from '@angular/core';
import {
  Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
} from '@angular/fire/auth';

import { LoginData } from './login-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) { }

  registration({
    email, password,
  }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logOut() {
    return signOut(this.auth);
  }
}
