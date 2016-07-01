import Helper from "./helper";
import Searcher from "./searcher";

module.exports = class NyaaAPI {

  constructor() {
    const helper = new Helper();
    this.searcher = new Searcher(helper);
  };

  search({ filter, category, sub_category, term }) {
    return this.searcher.executeSearch({ filter, category, sub_category, term });
  };

};
