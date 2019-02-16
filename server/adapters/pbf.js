const utils = require('../utils');
const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://pbfcomics.com/feed/';

module.exports = {
  load: async () => {
    const parsedFeed = await utils.parseFeed(URL);

    return Promise.all(parsedFeed.items.map(async (item) => {
        const response = await axios.get(item.link);
        const $ = cheerio.load(response.data);

        $('#comic img').addClass('img-fluid');

        item.content = $('#comic').html();

        return item;
      })).then(() => parsedFeed);
  }
};