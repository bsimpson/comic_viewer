const utils = require('../utils');
const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'http://feeds.feedburner.com/oatmealfeed';

module.exports = {
  load: async () => {
    const parsedFeed = await utils.parseFeed(URL);

    parsedFeed.items.map(async (item) => {
      const response = await axios.get(item.link);
      const $ = cheerio.load(response.data);

      $('#comic img').addClass('img-fluid');

      Reflect.deleteProperty(item, 'content');
      item.content = $('#comic').html();

      return item;
    });

    return parsedFeed;
  }
};