/*
 * File: io.ts
 * Project: VoiceAssistant
 * File Created: Wednesday, 3rd April 2019 9:59:59 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Wednesday, 3rd April 2019 10:00:02 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import Nano from 'nano';

export abstract class Io<T> implements Nano.MaybeDocument {

  public _rev: string;

  private _db: Nano.DocumentScope<T>;

  constructor(public _id: string, db: string, dbName: string) {

    this._rev = undefined;

    const n = Nano(db);
    this._db = n.db.use<T>(dbName);

  }

  public sync(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.get()
        .then(() => resolve())
        .catch((e) => this.save()
          .then(() => resolve())
          .catch((e2) => reject(e2)));
    });
  }

  public get json() {
    const data: T = null;
    Object.assign<T, this>(data, this);
    // Type T doesn't include _db
    // data._db = undefined;
    return data;
  }

  public get id() {
    return this._id;
  }

  public async get() {
    Object.assign(this, await this._db.get(this._id));
  }

  public async save() {
      const response = await this._db.insert(this.json);
      this.processAPIResponse(response);
  }

  public async del() {
    await this._db.destroy(this._id, this._rev);
  }

  private processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id;
      this._rev = response.rev;
    } else {
      throw new Error('[Io]: Nano sync response');
    }
  }

}
