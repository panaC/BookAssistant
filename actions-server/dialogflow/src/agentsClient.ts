import dialogflow from 'dialogflow';
import { readFileSync, writeFileSync } from 'fs';

const authProject = JSON.parse(readFileSync('voiceassistant-f9612-8f199ed749ed.json').toString());

const client = new dialogflow.v2.AgentsClient({
  credentials: authProject,
  projectId: authProject.project_id,
});

client.getProjectId().then((data) => {
  console.log(client.projectPath(data));
  client.exportAgent({
    parent: client.projectPath(data),
  }).then((data) => {
    return data[0].promise();
  }).then((rep) => {
    writeFileSync('backup.zip', Buffer.from(rep[0].agentContent, 'base64'));
  }).catch((err) => {
    console.error(err);
  });
}).catch((err) => {
  console.error(err);
});
