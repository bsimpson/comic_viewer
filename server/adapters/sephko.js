const utils = require('../utils');
const cheerio = require('cheerio');

const URL = 'http://www.sephko.com/feeds/posts/default?alt=rss';

module.exports = {
  load: async () => {
    const parsedFeed = await utils.parseFeed(URL);

    parsedFeed.items.map((item) => {
      const $ = cheerio.load(item['content']);
      $('div img').addClass('img-fluid');

      item.content = $('div').html();

      return item;
    });

    return parsedFeed;
  }
};