'use strict'

// Import the API wrapper.
const NyaaAPI = require('../nyaa-api-pt')

// Create an instance of the API wrapper.
const nyaa = new NyaaAPI()

// Make a search request to nyaa.pantsu.cat:
nyaa.search({
  query: 'horriblesubs',
  filter: 'trusted_only',
  category: 'anime',
  sub_category: 'english_translated',
  page: 2,
  sort: 'date',
  order: false,
  max: 300,
  userID: 14
}).then(res => console.log(res))
  .catch(err => console.error(err))

// Make a get request to nyaa.pantsu.cat:
nyaa.getTorrents({
  max: 50,
  page: 1
}).then(res => console.log(res))
  .catch(err => console.error(err))

// Get details on a torrent.
nyaa.getTorrent(924727)
  .then(res => console.log(res))
  .catch(err => console.error(err))
