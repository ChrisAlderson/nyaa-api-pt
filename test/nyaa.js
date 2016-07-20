const chai = require('chai');
const assert = chai.assert;
const NyaaAPI = require("../nyaa-api-pt");

describe("Nyaa", () => {

  let nyaa;
  before(() => nyaa = new NyaaAPI());

  it("Should get results with a search", done => {
    nyaa.search({
      term: "bakemonogatari",
      filter: "trusted_only",
      category: "anime",
      sub_category: "english_translated"
    }).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

});
