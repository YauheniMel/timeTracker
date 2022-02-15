export interface InfoMonth {
  month: number;
  year: number;
  listOfDays: {
    day: number;
    freeTime: number[] | null;
    toDos:
      | {
          from: number;
          to: number;
          discription: string;
        }[]
      | null;
  }[];
}
