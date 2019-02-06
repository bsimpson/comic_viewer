const utils = require('../utils');
const URL = 'http://www.mrlovenstein.com/rss.xml';

module.exports = {
  load: () => utils.parseFeed(URL),
};