import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable()
export class DatabaseService {
  itemsRef!: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getData(): Observable<any> {
    const user = getAuth().currentUser;

    return this.db.list(`users/${user!.uid}`).valueChanges();
  }

  setUser(firstName: string, lastName: string): Promise<any> {
    const user = getAuth().currentUser;

    return this.db.list('users').set(user!.uid, {
      firstName,
      lastName,
    });
  }
}
