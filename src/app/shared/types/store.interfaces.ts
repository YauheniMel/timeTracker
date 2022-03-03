import { InfoMonth } from './info-month.interface';
import { User } from './user.interface';

export interface AppStateInterface {
  isAuth: boolean;
  profile?: User;
  infoMonth?: InfoMonth;
}

export interface DashboardInterface {
  firstName: string;
  lastName: string;
}
