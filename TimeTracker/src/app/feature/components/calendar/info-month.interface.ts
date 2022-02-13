export interface InfoMonth {
  month: number;
  listOfDays: {
    day: number;
    freeTime: number[];
    toDos:
      | {
          from: number;
          to: number;
          discription: string;
        }[]
      | null;
  }[];
}
