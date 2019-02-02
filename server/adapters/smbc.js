const utils = require('../utils');
const URL = 'https://www.smbc-comics.com/comic/rss';

module.exports = {
  load: () => utils.parseFeed(URL),
};