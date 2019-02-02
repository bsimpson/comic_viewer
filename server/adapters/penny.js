const utils = require('../utils');
const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://www.penny-arcade.com/feed';

module.exports = {
  load: async () => {
    const parsedFeed = await utils.parseFeed(URL);

    // Remove news items
    parsedFeed.items = parsedFeed.items.filter((item) => item.title.match(/Comic:/u));

    parsedFeed.items.map(async (item) => {
      const response = await axios.get(item.link);
      const $ = cheerio.load(response.data);

      $('#comicFrame img').addClass('img-fluid');

      item.content = $('#comicFrame').html();

      return item;
    });

    return parsedFeed;
  }
};