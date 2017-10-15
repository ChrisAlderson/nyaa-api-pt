// Import the necessary modules.
/* eslint-disable no-console */
const NyaaApi = require('..')

// Create an instance of the API wrapper.
const nyaa = new NyaaApi({
  apiToken: process.env.NYAA_TOKEN
})

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

// Get details on a torrent.
nyaa.getTorrent(924727)
  .then(res => console.log(res))
  .catch(err => console.error(err))

// Get a torrent head.
nyaa.getTorrentHead(962988)
  .then(res => console.log(res))
  .catch(err => console.error(err))

// Login with a user.
nyaa.login({
  username: process.env.NYAA_USER,
  password: process.env.NYAA_PASS
}).then(res => console.log(res))
  .catch(err => console.error(err))

// Get the profile of a user.
nyaa.getProfile(13803)
  .then(res => console.log(res))
  .catch(err => console.error(err))
