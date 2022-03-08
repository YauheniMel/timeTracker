import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';

import {
  LoginInterface,
  RegisterInterface
} from '../../shared/types/auth.interface';

@Injectable()
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  registration({ email, password }: RegisterInterface): Observable<any> {
    return AuthService.fromFirebaseAuthPromise(
      this.angularFireAuth.createUserWithEmailAndPassword(email!, password!)
    );
  }

  login({ email, password }: LoginInterface): Observable<any> {
    return AuthService.fromFirebaseAuthPromise(
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
    );
  }

  logout(): Observable<any> {
    return AuthService.fromFirebaseAuthPromise(this.angularFireAuth.signOut());
  }

  static fromFirebaseAuthPromise(promise: Promise<any>): Observable<any> {
    return from(<Promise<any>>promise);
  }
}
