'use strict';

// Import the API wrapper.
const NyaaAPI = require('../nyaa-api-pt');

// Create an instance of the API wrapper.
const nyaa = new NyaaAPI({debug: true});

// Make a search request to nyaa.se.
nyaa.search({
  term: 'horriblesubs',
  filter: 'trusted_only',
  category: 'anime',
  sub_category: 'english_translated',
  user: 64513,
  offset: 2
}).then(res => console.log(res))
  .catch(err => console.error(err));
