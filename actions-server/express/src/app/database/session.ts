import Nano from 'nano'
import { Isession, Iuser, Istate, Ihistoric } from './interface/session.interface';
import { DB_URL, DB_NAME } from '../../constants';

// coucdb session implemtentation
// request from app.middleware
// get and save from userId session data
export class Session implements Isession {
  _id: string
  _rev: string
  
  private _db: Nano.DocumentScope<Isession>;
  private _wait: Promise<void>;
  private _convId: string;

  user: Iuser;
  state: {
    [id: string]: Istate;
  };
  historic: Ihistoric[];

  constructor(userId: string, convId: string) {
    this._id = userId;
    this._rev = undefined;
    this._convId = convId;

    const n = Nano(DB_URL);
    this._db = n.db.use<Isession>(DB_NAME);

    this.user = {
      lastseen: new Date(),
    };
    this.state[convId] = this.initState();
    this.historic = [];

    this._wait = new Promise<void>((resolve, reject) => {
      this.get()
      .then(() => {
        if (this.state[this._convId]) {
          this.state[convId] = this.initState();
          this.save().then(() => resolve()).catch((e) => reject(e));
        } else {
          resolve();
        }
      })
      .catch((e) =>
        this.save().then(() => resolve()).catch((e) => reject(e)));
    });
  }

  private initState(): Istate {
    return ({
      lastSeen: new Date(),
      chapterToPlay: 0,
      state: 'start',
      currentPlayingMedia: null,
      choice: null,
      yes_no: null,
    });
  }

  private processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id
      this._rev = response.rev
    } else {
      throw new Error('Nano save response');
    }
  }

  private async get() {
      Object.assign(this, await this._db.get(this._id));
  }

  get data() {
    const data = Object.assign({}, this);
    data._db = undefined;
    data._wait = undefined;
    data._convId = undefined;
    return data;
  }

  public async save() {
      const response = await this._db.insert(this.data);
      this.processAPIResponse(response);
  }

  public async close() {
    this.state[this._convId] = undefined;
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

    let session = new Session('userId', 'sessionId');
    await session.waitInit;
    
    session.user = {
      lastseen: new Date(Date.now()),
      name: "fake test",
    };
    await session.save();

    let session2 = new Session('userId', 'sessionId');
    await session2.waitInit;

    //await session.del();
    
    console.log(session.data);
    console.log(session2.data);
    
  })();
}