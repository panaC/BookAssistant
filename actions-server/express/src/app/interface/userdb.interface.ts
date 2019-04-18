
export interface IuserDataDb {
  bookAlreadyListen: {
    [id: string]: {
      chapter: number,
      lastListen: Date,
    },
  };
}
