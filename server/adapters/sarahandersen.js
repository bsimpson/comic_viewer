const utils = require('../utils');
const cheerio = require('cheerio');

const URL = 'http://sarahcandersen.com/rss';

module.exports = {
  load: async () => {
    const parsedFeed = await utils.parseFeed(URL);
    parsedFeed.items = parsedFeed.items.filter((item) => {
      const $ = cheerio.load(item.content);

      return $('img').length > 0;
    });

    return parsedFeed;
  },
};