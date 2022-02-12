export interface Store {
  profile: {
    firstname: string;
    lastName: string;
  };
  listOfYears: [
    {
      year: number;
      listOfMonths: {
        month: number;
      };
    },
  ];
}
