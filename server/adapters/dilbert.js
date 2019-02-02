const utils = require('../utils');
const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://dilbert.com/feed';

module.exports = {
  load: async () => {
    const parsedFeed = await utils.parseFeed(URL);

    parsedFeed.items.map(async (item) => {
      const response = await axios.get(item.link);
      const $ = cheerio.load(response.data);

      $('.img-comic-link img').addClass('img-fluid');

      item.content = $('.img-comic-link').html();

      return item;
    });

    return parsedFeed;
  }
};