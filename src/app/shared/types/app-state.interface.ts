import { RegisterInterface } from './auth.interface';

export interface AppStateInterface {
  profile: RegisterInterface;
  infoMonth?: {
    month: number | null;
    year: number | null;
    listOfDays:
      | {
          day: number;
          freeTime: number[];
          toDos:
            | {
                from: number;
                to: number;
                description: string;
              }[]
            | null;
        }[]
      | null;
  };
}
