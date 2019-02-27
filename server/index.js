const express = require('express');
const app = express();
const {url, manifest} = require('./adapters/manifest');
const cache = require('memory-cache');
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/comics/:comic.json', async (req, res) => {
  const {comic} = req.params;

  if (!cache.get(`urls_${comic}`)) {
    cache.put(`urls_${comic}`, await url(comic), 3600 * 1000);
  }

  res.send(cache.get(`urls_${comic}`));
});

app.get('/manifest.json', async(req, res) => {
  res.send(Object.keys(manifest()));
});

app.listen(PORT, () => {
  console.log('Starting server on localhost:3000');
});