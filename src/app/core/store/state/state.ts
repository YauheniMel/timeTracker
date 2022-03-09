import { AppStateInterface } from 'src/app/shared/types/store.interfaces';

export const initialState: AppStateInterface = {
  isAuth: false,
  profile: {
    firstName: '',
    lastName: ''
  },
  infoMonth: {
    month: 0,
    year: 0,
    listOfDays: []
  }
};

export function getInitialState(): AppStateInterface {
  return initialState;
}
