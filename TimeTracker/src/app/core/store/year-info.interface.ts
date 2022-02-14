export interface YearInfo {
  year: number,
  listOfMonths: {
    month: number;
    year: number;
    listOfDays: {
      day: number;
      freeTime: number[] | [];
      toDos:
      | {
        from: number;
        to: number;
        discription: string;
      }[]
      | null;
    }[];
  }[]
}
