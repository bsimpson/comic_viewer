const utils = require('../utils');

const URL = 'http://onegianthand.com/rss';

module.exports = {
  load: () => utils.parseFeed(URL),
};