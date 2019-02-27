const utils = require('../utils');
const cheerio = require('cheerio');

const URL = 'http://donthitsave.com/donthitsavefeed.xml';

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