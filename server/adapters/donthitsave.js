const utils = require('../utils');

const URL = 'http://donthitsave.com/donthitsavefeed.xml';

module.exports = {
  load: () => utils.parseFeed(URL),
};