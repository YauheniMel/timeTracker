export interface TaskInterface {
  year: number;
  month: number;
  day: number;
  freeTime: number[];
  toDo: {
    from: number;
    to: number;
    description: string;
  };
}

export interface TasksInterface {
  year: number;
  month: number;
  day: number;
  freeTime: number[];
  toDos: {
    from: number;
    to: number;
    description: string;
  }[];
}
