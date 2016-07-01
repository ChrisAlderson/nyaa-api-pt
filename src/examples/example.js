// Import the API wrapper.
import NyaaAPI from "../nyaa-api-pt";

// Create an instance of the API wrapper.
const nyaa = new NyaaAPI();

// Make a search request to nyaa.se.
nyaa.search({
  filter: "trusted_only",
  category: "anime",
  sub_category: "english_translated",
  term: "bakemonogatari"
})
  .then(res => console.log(res))
  .catch(err => console.error(err));
