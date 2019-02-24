const utils = require('../utils');
const cheerio = require('cheerio');

const URL = 'http://mikeorganisciak.com/feed/';

module.exports = {
  load: async () => {
    const parsedFeed = await utils.parseFeed(URL);
    parsedFeed.items.forEach((item) => {
      const $ = cheerio.load(item['content:encoded']);
      $('p img').addClass('img-fluid');
      item.content = $('a').html();
    });

    return parsedFeed;
  },
};