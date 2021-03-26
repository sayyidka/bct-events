const axios = require('axios');
const cryptoNames = require('../data/crypto_names');

class TwitterApi {
  constructor() {
    this.baseUrl = process.env.BASE_TWITTER_URL;
    this.token = process.env.BEARER_TOKEN;
  }

  /**
   * Check if last Elon Musk's tweets talked about crypto
   * @returns {object}
   */
  async getElonCryptoTweets() {
    const endpoint =
      '/tweets/search/recent?query=from:elonmusk&tweet.fields=created_at';
    const tweets = await this.callApi(endpoint);
    const cryptoTweets = [];
    await tweets.forEach((tweet) => {
      cryptoNames.forEach((name) => {
        if (tweet.text.includes(name)) {
          cryptoTweets.push(tweet);
        }
      });
    });

    const message =
      cryptoTweets.length > 0
        ? 'Elon talked about cryptos!'
        : "Elon didn't speak about crypto today, what's going on ?";
    return {
      message,
      cryptoTweets,
    };
  }

  /**
   * Get recent tweets based on input currency hashtag
   * @param {string} currency
   * @returns {Array}
   */
  async getCryptoTweets(currency) {
    const encodedQuery = encodeURIComponent(`#${currency} lang:en`);
    const endpoint = `/tweets/search/recent?query=${encodedQuery}&max_results=10&tweet.fields=created_at,lang`;
    return this.callApi(endpoint);
  }

  /**
   * Fetch Twitter API based on input endpoint
   * @param {string} endpoint
   * @returns {object}
   */
  async callApi(endpoint) {
    const config = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    try {
      const response = await axios.get(this.baseUrl + endpoint, config);
      const tweets = response.data.data;
      return tweets;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = TwitterApi;
