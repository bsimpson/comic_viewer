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
const extrafabulous = require('./extrafabulous');
const onegianthand = require('./onegianthand');
const sephko = require('./sephko');
const mikeorganisciak = require('./mikeorganisciak');
const sarahandersen = require('./sarahandersen');
const commitstrip = require('./commitstrip');

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
    extrafabulous,
    onegianthand,
    sephko,
    mikeorganisciak,
    sarahandersen,
    commitstrip,
  };
}

module.exports = {
  url,
  manifest,
};