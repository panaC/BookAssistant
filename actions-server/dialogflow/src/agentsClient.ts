import { JSON_CREDENTIAL_PATH } from './constants';
import dialogflow from 'dialogflow';
import { readFileSync, writeFileSync } from 'fs';
import debug from 'debug';

const log = debug('diagflow:log');
const err = debug('diagflow:err');

const authProject = JSON.parse(readFileSync(JSON_CREDENTIAL_PATH).toString());

const client = new dialogflow.v2.AgentsClient({
  credentials: authProject,
  projectId: authProject.project_id,
});

client.getProjectId().then((data) => {
  log(client.projectPath(data));
  client.exportAgent({
    parent: client.projectPath(data),
  }).then((data) => {
    return data[0].promise();
  }).then((rep) => {
    writeFileSync('backup.zip', Buffer.from(rep[0].agentContent, 'base64'));
    log('write backup.zip success');
  }).catch((err) => {
    err(err);
  });
}).catch((err) => {
  err(err);
});
