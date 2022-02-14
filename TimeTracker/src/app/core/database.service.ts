import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable()
export class DatabaseService {
  itemsRef!: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {}

  setUser(firstName: string, lastName: string): Promise<any> {
    const user = getAuth().currentUser;

    const profile: { firstName: string; lastName: string } = {
      firstName,
      lastName,
    };

    return this.db.list('users').set(user!.uid, {
      profile,
    });
  }

  setTask(formData: any, info: any): void {
    info.infoDay.freeTime.splice(
      formData.fromTimeCtrl,
      ++formData.toTimeCtrl - formData.fromTimeCtrl,
    );

    const initData = createInitData(
      info.infoMonth.year, // too match parameters
      info.infoMonth.month,
      info.infoDay.day,
      info.infoDay.freeTime,
      formData.fromTimeCtrl,
      formData.toTimeCtrl,
      formData.discriptionCtrl,
    );

    const user = getAuth().currentUser;

    this.db
      .list(`users/${user!.uid}/listOfYears`)
      .valueChanges()
      .subscribe((res) => {
        if (!res.length) {
          this.db.list('users').set(`${user!.uid}/listOfYears/${info.infoMonth.year}/${info.infoMonth.month}`, initData);
        } else {
          debugger;
        }
      });
  }

  getInfoYears(): Observable<any> { // need rename
    const user = getAuth().currentUser;

    return this.db // need pipe
      .list(`users/${user!.uid}/listOfYears`)
      .valueChanges();
  }

  getDbByParameter(
    year: number | null = null,
    month: number | null = null,
    day: number | null = null,
  ): Observable<any> {
    const user = getAuth().currentUser;

    if (!day) {
      return this.db
        .list(`users/${user!.uid}/listOfYears/${year}/${month}`)
        .valueChanges();
    }

    if (!month) {
      return this.db
        .list(`users/${user!.uid}/listOfYears/${year}`)
        .valueChanges();
    }

    if (!year) {
      return this.db.list(`users/${user!.uid}/profile`).valueChanges();
    }

    return this.db
      .list(`users/${user!.uid}/listOfYears/${year}/${month}/${day}`)
      .valueChanges();
  }
}
// need another place/way
function createInitData(
  year: number,
  month: number,
  day: number,
  freeTime: number[],
  from: number,
  to: number,
  discription: string,
) {
  const init = {
    month,
    year,
    day,
    freeTime,
    toDos: [
      {
        from,
        to,
        discription,
      },
    ],
  };
  return init;
}
