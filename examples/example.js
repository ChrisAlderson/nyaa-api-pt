// Import the API wrapper.
const NyaaAPI = require("../nyaa-api-pt");

// Create an instance of the API wrapper.
const nyaa = new NyaaAPI();

// Make a search request to nyaa.se.
nyaa.search({
  term: "bakemonogatari",
  filter: "trusted_only",
  category: "anime",
  sub_category: "english_translated",
  user: 62260
}).then(res => console.log(res))
  .catch(err => console.error(err));
