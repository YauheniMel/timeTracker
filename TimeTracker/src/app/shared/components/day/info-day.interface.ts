export interface InfoDay {
  day: number;
  month: number;
  year: number;
  freeTime: number[] | null;
  toDos: {
    from: number;
    to: number;
    discription: string;
  }[]
  | null;
}
