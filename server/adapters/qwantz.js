const utils = require('../utils');
const URL = 'http://qwantz.com/rssfeed.php';

module.exports = {
  load: () => utils.parseFeed(URL),
};