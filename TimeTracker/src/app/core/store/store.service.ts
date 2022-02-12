import { Injectable } from '@angular/core';
import { StoreApp } from './store.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() { }

  getDetailsMonth() {
    const store = StoreApp;
    debugger;
  }
}
