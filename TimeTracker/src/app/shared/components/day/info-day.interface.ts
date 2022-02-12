export interface InfoDay {
  day: number;
  freeTime: number[];
  toDos:
  | {
    from: number;
    to: number;
    discription: string;
  }[]
  | null;
}
