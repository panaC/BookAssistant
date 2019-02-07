/*
 * File: backup.ts
 * Project: VoiceAssistant
 * File Created: Thursday, 7th February 2019 3:17:57 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Thursday, 7th February 2019 3:18:03 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { JSON_CREDENTIAL_PATH } from './constants';
import dialogflow from 'dialogflow';
import { readFileSync, writeFileSync } from 'fs';
import { log, err } from './debug';

interface ICredential {
  project_id: string;
  client_email: string;
  private_key: string;
}

const BACKUP_ZIP = 'backup.zip';

export class DialogflowAgent {
  private client: dialogflow.AgentsClient;

  constructor(keyFilename: string, private backupFilename: string = BACKUP_ZIP) {
    const credential: ICredential = JSON.parse(readFileSync(keyFilename).toString());
    this.client = new dialogflow.v2.AgentsClient({
      credentials: credential,
      projectId: credential.project_id,
    });
    log('DialogflowAgent Constructor called');
  }

  public async backup() {
    try {
      const name = await this.client.getProjectId();
      const rep = await this.client.exportAgent({
        parent: this.client.projectPath(name),
      });

      rep[0].on('complete', (result) => {
        writeFileSync(this.backupFilename, Buffer.from(result.agentContent, 'base64'));
        log(`write ${this.backupFilename} success`);
      });

      rep[0].on('error', (e) => {
        throw e;
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  public async restore() {
    try {
      const name = await this.client.getProjectId();
      const rep = await this.client.importAgent({
        parent: this.client.projectPath(name),
        agentContent: readFileSync(BACKUP_ZIP).toString('base64'),
      });

      rep[0].on('complete', () => {
        log(`restore ${this.backupFilename} complete`);
      });

      rep[0].on('error', (e) => {
        throw e;
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  const l = new DialogflowAgent(JSON_CREDENTIAL_PATH);
  (async () => {
    try {
      await l.backup();
      await l.restore();
    } catch (e) {
      err(e);
    }
  })();
}
