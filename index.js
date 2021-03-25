const axios = require('axios');
const cryptoNames = require('./data/crypto_names');

require('dotenv').config();

// API credentials
const TOKEN = process.env.BEARER_TOKEN;
const TWITTER_URL = process.env.BASE_TWITTER_URL;

// Request data
const config = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

/**
 * Fetch Tweets
 * @returns {object}
 */
async function callTweeterApi() {
  try {
    const response = await axios.get(
      `${TWITTER_URL}/tweets/search/recent?query=from:elonmusk&tweet.fields=created_at`,
      config,
    );
    const tweets = response.data.data;
    return tweets;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Run all process
 * @returns {void}
 */
async function run() {
  const tweets = await callTweeterApi();
  const cryptoTweets = [];
  await tweets.forEach((tweet) => {
    cryptoNames.forEach((name) => {
      if (tweet.text.includes(name)) {
        cryptoTweets.push(tweet);
      }
    });
  });

  if (cryptoTweets.length > 0) {
    const result = 'Elon talked about cryptos!';
    console.log(result);
    console.log(cryptoTweets);
  } else {
    const result = "Elon didn't speak about crypto today, what's going on ?";
    console.log(result);
  }
}

run();
