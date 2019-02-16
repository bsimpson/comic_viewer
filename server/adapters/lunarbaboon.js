const utils = require('../utils');

const URL = 'http://www.lunarbaboon.com/comics/rss.xml';

module.exports = {
  load: async () => {
    return await utils.parseFeed(URL);
  }
};