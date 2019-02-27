const utils = require('../utils');
const URL = 'http://qwantz.com/rssfeed.php';
const cheerio = require('cheerio');

module.exports = {
  load: async () => {
    const parsedFeed = await utils.parseFeed(URL);

    return Promise.all(parsedFeed.items.map((item) => {
      const $ = cheerio.load(item.content);

      const imgSrc = $('img').attr('src');
      item.content = `<img src="${imgSrc}" class="img-fluid" />`;

      return item;
    })).then(() => parsedFeed);
  }
};