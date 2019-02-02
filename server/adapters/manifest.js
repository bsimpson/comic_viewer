const dilbert = require('./dilbert');
const explosm = require('./explosm');
const oatmeal = require('./oatmeal');
const penny = require('./penny');
const qwantz = require('./qwantz');
const smbc = require('./smbc');
const xkcd = require('./xkcd');

async function urls() {
  return {
    dilbert: await dilbert.load().catch(console.err),
    explosm: await explosm.load().catch(console.err),
    oatmeal: await oatmeal.load().catch(console.err),
    penny: await penny.load().catch(console.err),
    qwantz: await qwantz.load().catch(console.err),
    smbc: await smbc.load().catch(console.err),
    xkcd: await xkcd.load().catch(console.err),
  }
}

module.exports = {
  urls,
};