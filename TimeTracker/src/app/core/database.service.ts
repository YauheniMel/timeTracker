import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { FormGroup } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { InfoDay } from '../shared/components/day/info-day.interface';

@Injectable()
export class DatabaseService {
  itemsRef!: AngularFireList<any>;

  user = getAuth().currentUser;

  constructor(private db: AngularFireDatabase) {}

  setUser(firstName: string, lastName: string): Promise<any> {
    const profile: { firstName: string; lastName: string } = {
      firstName,
      lastName,
    };

    return this.db.list('users').set(this.user!.uid, {
      profile,
    });
  }

  setTask(formData: FormGroup, info: InfoDay): void {
    this.checkDb(info.day, info.month, info.year)
      .pipe(take(1))
      .subscribe((res) => {
        if (!res.length) {
          info.freeTime!.splice(
            formData.value.fromTimeCtrl,
            ++formData.value.toTimeCtrl - formData.value.fromTimeCtrl + 1
          );

          const initData = createInitData(
            info.year, // too match parameters
            info.month,
            info.day,
            info.freeTime,
            formData.value.fromTimeCtrl,
            formData.value.toTimeCtrl,
            formData.value.discriptionCtrl
          );

          this.db
            .list(`users/${this.user!.uid}/listOfYears`)
            .valueChanges()
            .subscribe(() => {
              this.db
                .list('users')
                .set(
                  `${this.user!.uid}/listOfYears/${info.year}/${info.month}/${
                    info.day
                  }`,
                  initData
                );
            });
        } else {
          const [day, freeTime, month, toDos, year] = res;
          const from = freeTime.indexOf(formData.value.fromTimeCtrl);
          const to = freeTime.indexOf(formData.value.toTimeCtrl);
          debugger;
          freeTime.splice(from, to - from + 1);

          const newToDos = toDos.concat({
            from: formData.value.fromTimeCtrl,
            to: formData.value.toTimeCtrl,
            discription: formData.value.discriptionCtrl,
          });

          const data = {
            month,
            year,
            day,
            freeTime,
            toDos: newToDos,
          };

          this.db
            .list(`users/${this.user!.uid}/listOfYears`)
            .valueChanges()
            .subscribe(() => {
              this.db
                .list('users')
                .update(
                  `${this.user!.uid}/listOfYears/${year}/${month}/${day}`,
                  data
                );
            });
        }
      });
  }

  getDbProfile(): Observable<any> {
    return this.db.list(`users/${this.user!.uid}/profile`).valueChanges();
  }

  getDbByParameter(
    year: number | null = null,
    month: number | null = null,
    day: number | null = null
  ): Observable<any> {
    if (day && month && year) {
      return this.db
        .list(`users/${this.user!.uid}/listOfYears/${year}/${month}/${day}`)
        .valueChanges();
    }

    if (!day && month && year) {
      return this.db
        .list(`users/${this.user!.uid}/listOfYears/${year}/${month}`)
        .valueChanges();
    }

    if (!day && !month && year) {
      return this.db
        .list(`users/${this.user!.uid}/listOfYears/${year}`)
        .valueChanges();
    }

    return this.db // need pipe
      .list(`users/${this.user!.uid}/listOfYears`)
      .valueChanges();
  }

  checkDb(day: number, month: number, year: number): Observable<any> {
    return this.db
      .list(`users/${this.user!.uid}/listOfYears/${year}/${month}/${day}`)
      .valueChanges();
  }
}

// need another place/way
function createInitData(
  year: number,
  month: number,
  day: number,
  freeTime: number[] | null,
  from: number,
  to: number,
  discription: string
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
