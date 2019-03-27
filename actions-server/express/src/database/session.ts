import Nano from 'nano'
import { Isession, Iuser, Istate, Ihistoric } from './interface/session.interface';
import { DB_URL, DB_NAME } from '../constants';

export class Session implements Isession {
  _id: string
  _rev: string
  
  private _db: Nano.DocumentScope<Isession>;
  private _wait: Promise<void>;

  user: Iuser;
  state: Istate;
  historic: Ihistoric;

  constructor(id: string = undefined) {
    this._id = id;
    this._rev = undefined;

    const n = Nano(DB_URL);
    this._db = n.db.use<Isession>(DB_NAME);

    this._wait = new Promise<void>((resolve, reject) => {
      if (this._id) {
        this.get().then(() => resolve()).catch((e) => reject(e));
      }
      this.set().then(() => resolve()).catch((e) => reject(e));
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
      // error e
    }
  }

  public async set() {
    try {
      const data = Object.assign({}, this);
      data._db = undefined;
      data._wait = undefined;
      const response = await this._db.insert(data);
      this.processAPIResponse(response);
    } catch(e) {
      // error e
    }
  }

  get id() {
    return this._id;
  }

  get waitInit() {
    return this._wait;
  }
}