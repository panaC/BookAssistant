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

export class DiagflowAgent {
  private client: dialogflow.AgentsClient;

  constructor(keyFilename: string) {
    const credential: ICredential = JSON.parse(readFileSync(keyFilename).toString());
    this.client = new dialogflow.v2.AgentsClient({
      credentials: credential,
      projectId: credential.project_id,
    });
  }

  public async backup() {
    try {
      const name = await this.client.getProjectId();
      const rep = await this.client.exportAgent({
        parent: this.client.projectPath(name),
      });

      rep[0].on('complete', (result) => {
        writeFileSync('backup.zip', Buffer.from(result.agentContent, 'base64'));
        log('write backup.zip success');
      });

      rep[0].on('error', (e) => {
        err(e);
      });
    } catch (e) {
      err('global', e);
    }
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  new DiagflowAgent(JSON_CREDENTIAL_PATH).backup();
}
