export interface InfoMonth {
  day: number;
  month: number;
  year: number;
  listOfDays: {
    day: number;
    freeTime: number[];
    toDos:
    | {
      from: number;
      to: number;
      description: string;
    }[]
    | null;
  }[];
}
