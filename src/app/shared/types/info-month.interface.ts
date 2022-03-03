import { InfoDay } from './info-day.interface';

export interface InfoMonth {
  month: number;
  year: number;
  listOfDays: InfoDay[];
}
