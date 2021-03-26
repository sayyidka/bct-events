const express = require('express');
const cors = require('cors');
const TwitterApi = require('./services/TwitterApi');

const application = express();

application.use(cors());
application.use(express.json());

application.get('/', async (req, res) => res.send('yooooo !!!!').status(200));

application.get('/elon', async (req, res) => {
  const api = new TwitterApi();
  const result = await api.getElonCryptoTweets();
  return res.status(200).json(result);
});

application.post('/sentiment/:cryptocurrency', async (req, res) => {
  const api = new TwitterApi();
  const result = await api.getCryptoTweets(req.params.cryptocurrency);
  res.status(200).json(result);
});

module.exports = application;
