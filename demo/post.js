const fs = require('fs');
const axios = require('axios');

const HOME = '/home/pierre/Documents/audiobook/json';
const SERVER = 'https://edrlab.tk';
const SERVER_API = `${SERVER}/api`;

fs.readdirSync(HOME).forEach(async (json) => {
  try {
    await axios.delete(`${SERVER_API}?q=${json.split('.json')[0]}`);
    await axios.post(SERVER_API, JSON.parse(fs.readFileSync(`${HOME}/${json}`).toString()));
  } catch (err) {
    console.log(`${json} : ${err}`);
  }
});
