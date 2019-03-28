import Nano from 'nano'
import { Isession, Iuser, Istate, Ihistoric } from './interface/session.interface';
import { DB_URL, DB_NAME } from '../constants';

// coucdb session implemtentation
// request from app.middleware
// get and save from userId session data
export class Session implements Isession {
  _id: string
  _rev: string
  
  private _db: Nano.DocumentScope<Isession>;
  private _wait: Promise<void>;

  user: Iuser;
  state: Istate;
  historic: Ihistoric[];

  constructor(id: string = undefined) {
    this._id = id;
    this._rev = undefined;

    const n = Nano(DB_URL);
    this._db = n.db.use<Isession>(DB_NAME);

    this.user = {
      lastseen: new Date(),
    };
    this.state = {
      chapterToPlay: 0,
      state: 0,
      currentPlayingMedia: null,
      choice: null,
      yes_no: null,
    };
    this.historic = [];

    this._wait = new Promise<void>((resolve, reject) => {
      if (this._id) {
        this.get().then(() => resolve()).catch((e) => reject(e));
      } else {
        this.save().then(() => resolve()).catch((e) => reject(e));
      }
    });
  }

  private processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id
      this._rev = response.rev
    }
  }

  private async get() {
    try {
      Object.assign(this, await this._db.get(this._id));
    } catch(e) {
      console.error(e);
    }
  }

  get data() {
    const data = Object.assign({}, this);
    data._db = undefined;
    data._wait = undefined;
    return data;
  }

  public async save() {
    try {
      const response = await this._db.insert(this.data);
      this.processAPIResponse(response);
    } catch(e) {
      console.error(e);
    }
  }
  
  public async del() {
    try {
      await this._db.destroy(this._id, this._rev);
    } catch(e) {
      console.error(e);
    }
  }

  get id() {
    return this._id;
  }

  get waitInit() {
    return this._wait;
  }
}

// main test
if (typeof require !== 'undefined' && require.main === module) {
  ( async () => {

    let session = new Session();
    await session.waitInit;
    
    session.user = {
      lastseen: new Date(Date.now()),
      name: "fake test",
    };
    await session.save();

    let session2 = new Session(session.id);
    await session2.waitInit;

    //await session.del();
    
    console.log(session.data);
    console.log(session2.data);
    
  })();
}