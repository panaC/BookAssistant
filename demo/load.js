
const fs = require('fs');

const HOME = '/home/pierre/Documents/audiobook';
const SERVER = 'https://edrlab.ml';
const SERVER_AUDIO = `${SERVER}/audiobook`;

const json = {
  "@context": "https://readium.org/webpub-manifest/context.jsonld",
  
  "metadata": {
    "@type": "http://schema.org/Book",
    "title": "La hache",
    "author": "George Beaume",
    "identifier": "George Beaume La hache",
    "dateCreated": "2018-04-23T23:18:00Z",
    "language": "FR",
    "collection": "ma collection",
    "genre": "classique"
  },

  "links": [
    /*{"rel": "audiobook", "href": "https://edrlab.ml/audiobook/Georges_Beaume_-_La_hache.mp3", "type": "audio/mp3"}*/
  ],
  
  "readingOrder": [],

  "resources": [
    {"rel": "cover", "href": "https://via.placeholder.com/600x400", "type": "image/jpeg"},
  ],
};

console.log(fs.readdirSync(HOME));

fs.readdirSync(HOME).forEach((dir) => {
  switch (dir) {
    case 'Victor-Dixen_Phobos-0_Phobos-Origines':
      json.metadata.title = 'Phobos Origines';
      json.metadata.author = 'Victor Dixen';
      json.metadata.identifier = dir,
      json.metadata.dateCreated = new Date(Date.now()).toISOString();
      json.metadata.language = 'FR';
      json.metadata.collection = 'Phobos';
      json.metadata.genre = 'SF';
      json.resources[0].href = 'https://images-na.ssl-images-amazon.com/images/I/51xst5TX4jL._SX210_.jpg';
      break;
    case 'Victor-Dixen_Phobos-1_Il-est-trop-tard-pour-regretter':
      json.metadata.title = 'Phobos Il est trop tard pour regretter';
      json.metadata.author = 'Victor Dixen';
      json.metadata.identifier = dir,
      json.metadata.dateCreated = new Date(Date.now()).toISOString();
      json.metadata.language = 'FR';
      json.metadata.collection = 'Phobos';
      json.metadata.genre = 'SF';
      json.resources[0].href = 'https://images-eu.ssl-images-amazon.com/images/I/51%2B4XVRLe7L._AA300_.jpg';
      break;
    case 'Victor-Dixen_Phobos-2_Il-est-trop-tard-pour-oublier':
      json.metadata.title = 'Phobos Il est trop tard pour oublier';
      json.metadata.author = 'Victor Dixen';
      json.metadata.identifier = dir,
      json.metadata.dateCreated = new Date(Date.now()).toISOString();
      json.metadata.language = 'FR';
      json.metadata.collection = 'Phobos';
      json.metadata.genre = 'SF';
      json.resources[0].href = 'https://m.media-amazon.com/images/I/51WEqquvZaL._SL500_.jpg';
      break;
    case 'honoré-de-balzac_la-femme-de-trente-ans':
      json.metadata.title = 'La femme de trente ans';
      json.metadata.author = 'Honoré de Balzac';
      json.metadata.identifier = dir,
      json.metadata.dateCreated = new Date(Date.now()).toISOString();
      json.metadata.language = 'FR';
      delete json.metadata.collection;
      json.metadata.genre = 'classique';
      json.resources[0].href = 'https://www.livredepoche.com/sites/default/files/styles/manual_crop_269_435/public/images/livres/couv/9782253057215-001-T.jpeg';
      break;
    case 'mark-twain_tom-sawyer':
      json.metadata.title = 'Tom sawyer';
      json.metadata.author = 'Mark Twain';
      json.metadata.identifier = dir,
      json.metadata.dateCreated = new Date(Date.now()).toISOString();
      json.metadata.language = 'EN';
      delete json.metadata.collection;
      json.metadata.genre = 'classique';
      json.resources[0].href = 'https://images-na.ssl-images-amazon.com/images/I/41fK2D8MUjL._SX331_BO1,204,203,200_.jpg';
      break;
    case 'sun-tzu_the-art-of-war':
      json.metadata.title = 'The art of war';
      json.metadata.author = 'Sun Tzu';
      json.metadata.identifier = dir,
      json.metadata.dateCreated = new Date(Date.now()).toISOString();
      json.metadata.language = 'EN';
      delete json.metadata.collection;
      json.metadata.genre = 'classique';
      json.resources[0].href = 'https://images-na.ssl-images-amazon.com/images/I/717VrgS6G7L.jpg'
      break;
    case 'Maxime-Chattam_La-conjuration-primitive':
      json.metadata.title = 'La conjuration primitive';
      json.metadata.author = 'Maxime Chattam';
      json.metadata.identifier = dir,
      json.metadata.dateCreated = new Date(Date.now()).toISOString();
      json.metadata.language = 'FR';
      delete json.metadata.collection;
      json.metadata.genre = 'Policier';
      json.resources[0].href = 'https://images-na.ssl-images-amazon.com/images/I/51qkVap2s0L._SX303_BO1,204,203,200_.jpg'
      break;
    default:
      console.log(`${dir} was not found in load.js`);
      return;
  }
  json.readingOrder = [];
  fs.readdirSync(`${HOME}/${dir}`).forEach((media) => {
    json.readingOrder.push({
      rel: media.split('.mp3')[0],
      href: `${SERVER_AUDIO}/${dir}/${encodeURI(media)}`,
      type: 'audio/mp3',
    });
  });
  if (!fs.existsSync(`${HOME}/json`)){
    fs.mkdirSync(`${HOME}/json`);
  }
  fs.writeFileSync(`${HOME}/json/${dir}.json`, JSON.stringify(json));
});

