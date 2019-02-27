const utils = require('../utils');
const cheerio = require('cheerio');

const URL = 'http://www.commitstrip.com/en/feed/';

module.exports = {
  load: async () => {
    const parsedFeed = await utils.parseFeed(URL);
    parsedFeed.items.forEach((item) => {
      const $ = cheerio.load(item['content:encoded']);

      $('img').addClass('img-fluid').
      removeAttr('width').
      removeAttr('height');

      item.content = $('p').html();
    });

    return parsedFeed;
  },
};