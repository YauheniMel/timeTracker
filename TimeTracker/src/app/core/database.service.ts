import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable()
export class DatabaseService {
  itemsRef!: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getData(): Observable<any> {
    return this.db.list('user').valueChanges();
  }
}
