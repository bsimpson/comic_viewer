const utils = require('../utils');
const cheerio = require('cheerio');

const URL = 'https://oddball.today/feed/';

module.exports = {
  load: async () => {
    const parsedFeed = await utils.parseFeed(URL);

    parsedFeed.items.map((item) => {
      const $ = cheerio.load(item['content:encoded']);
      $('p img').addClass('img-fluid');

      item.content = $('p').html();

      return item;
    });

    return parsedFeed;
  }
};