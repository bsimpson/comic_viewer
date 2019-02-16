const dilbert = require('./dilbert');
const explosm = require('./explosm');
const oatmeal = require('./oatmeal');
const penny = require('./penny');
const qwantz = require('./qwantz');
const smbc = require('./smbc');
const xkcd = require('./xkcd');
const mrlovenstein = require('./mrlovenstein');
const lunarbaboon = require('./lunarbaboon');
const pbf = require('./pbf');
const oddball = require('./oddball');
const donthitsave = require('./donthitsave');

async function url(comic) {
  return await manifest()[comic].load();
}

function manifest() {
  return {
    dilbert,
    explosm,
    oatmeal,
    penny,
    qwantz,
    smbc,
    xkcd,
    mrlovenstein,
    lunarbaboon,
    pbf,
    oddball,
    donthitsave,
  };
}

module.exports = {
  url,
  manifest,
};