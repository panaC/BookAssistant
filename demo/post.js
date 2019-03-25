const fs = require('fs');
const axios = require('axios');

const HOME = '/home/pierre/Documents/audiobook/json';
const SERVER = 'https://edrlab.ml';
const SERVER_API = `${SERVER}/api`;

fs.readdirSync(HOME).forEach(async (json) => {
  try {
    await axios.delete(`${SERVER_API}?q=${json.split('.json')[0]}`);
    await axios.post(SERVER_API, JSON.parse(fs.readFileSync(`${HOME}/${json}`).toString()));
  } catch (err) {
    console.log('==========');
    
    console.log(`${json} : ${err} on method ${err.response.config.method}`);
    console.log(err.response.data);

    console.log('==========');
  }
});
