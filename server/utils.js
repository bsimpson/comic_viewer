const Parser = require('rss-parser');
const parser = new Parser();
const cache = require('memory-cache');
const cheerio = require('cheerio');

async function parseFeed(rssUrl) {
  const cachedRssFeed = cache.get(rssUrl);
  if (cachedRssFeed) {
    return cachedRssFeed;
  }

  const rssFeed = await parser.parseURL(rssUrl);

  rssFeed.items.map((item) => {
    const $ = cheerio.load(item.content, {
      xmlMode: true,
    });
    $('img').addClass('img-fluid');
    item.content = $.html();
    return item;
  });

  cache.put(rssUrl, rssFeed, 3600 * 1000); // 1 hour

  return cache.get(rssUrl);
}

module.exports = {
  parseFeed,
};