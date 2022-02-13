export interface Store {
  profile: {
    firstname: string;
    lastName: string;
  };
  listOfYears?: {
    year: number;
    listOfMonths?: {
      month: number;
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
    }[];
  }[];
}

export const StoreApp: Store = {
  profile: {
    firstname: 'Yauheni',
    lastName: 'Melnik',
  },
  listOfYears: [
    {
      year: 2022,
      listOfMonths: [
        {
          month: 2,
          listOfDays: [
            {
              day: 1,
              freeTime: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23,
              ],
              toDos: null,
            },
            {
              day: 2,
              freeTime: [
                0, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23,
              ],
              toDos: [
                {
                  from: 2,
                  to: 4,
                  discription: 'Sleep',
                },
              ],
            },
            {
              day: 3,
              freeTime: [
                0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
                23,
              ],
              toDos: [
                {
                  from: 8,
                  to: 12,
                  discription: 'Read a book',
                },
              ],
            },
            {
              day: 4,
              freeTime: [0, 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23],
              toDos: [
                {
                  from: 8,
                  to: 17,
                  discription: 'Work',
                },
              ],
            },
            {
              day: 5,
              freeTime: [
                0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23,
              ],
              toDos: [
                {
                  from: 6,
                  to: 8,
                  discription: 'Wake up',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
