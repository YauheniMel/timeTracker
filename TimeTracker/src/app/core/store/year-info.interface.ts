export interface YearInfo {
  year: number;
  listOfMonths: {
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
  }[];
}
