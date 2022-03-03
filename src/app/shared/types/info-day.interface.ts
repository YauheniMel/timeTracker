export interface InfoDay {
  day: number;
  month: number;
  year: number;
  freeTime: number[];
  toDos:
    | {
        from: number;
        to: number;
        description: string;
      }[]
    | null;
}
