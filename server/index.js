const express = require('express');
const app = express();
const {urls} = require('./adapters/manifest');
const cache = require('memory-cache');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/comics.json', async (req, res) => {
  if (!cache.get('urls')) {
    cache.put('urls', await urls(), 3600 * 1000);
  }

  res.send(cache.get('urls'));
});

app.listen(3000, () => {
  console.log('Starting server on localhost:3000');
});