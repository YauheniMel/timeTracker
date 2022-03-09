import { AuthInterface } from 'src/app/core/store/reducers/auth.reducer';
import { InfoMonth } from './info-month.interface';
import { User } from './user.interface';

export interface AppStateInterface {
  Auth: AuthInterface;
  profile: User;
  infoMonth: InfoMonth;
}

export interface DashboardInterface {
  firstName: string;
  lastName: string;
}
