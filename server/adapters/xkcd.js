const utils = require('../utils');
const URL = 'https://xkcd.com/rss.xml';

module.exports = {
  load: () => utils.parseFeed(URL),
};