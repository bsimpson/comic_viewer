const utils = require('../utils');
const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'http://feeds.feedburner.com/Explosm';

module.exports = {
  load: async () => {
    const parsedFeed = await utils.parseFeed(URL);

    parsedFeed.items.map(async (item) => {
      const response = await axios.get(item.link);
      const $ = cheerio.load(response.data.replace(/\n/gu, ''));
      $('#main-comic').addClass('img-fluid');

      item.content = $('section#main-content #comic-wrap').html();

      return item;
    });

    return parsedFeed;
  }
};