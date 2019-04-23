
export interface IuserDataDb {
  bookAlreadyListen: {
    [id: string]: {
      track: number,
      timecode: number,
      lastListen: Date,
    },
  };
}
