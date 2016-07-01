export default class Searcher {

  constructor(helper) {
    this.helper = helper;

    this.categories = {
      anime: {
        category_id: "1_0",
        sub_categories: {
          english_translated: "1_37",
          raw: "1_11",
          Non_english_translated: "1_38",
          anime_music_video: "1_32"
        }
      },
      literature: {
        category_id: "2_0",
        sub_categories: {
          english_translated: "2_12",
          raw: "2_13",
          non_english_translated: "2_39"
        }
      },
      audio: {
        category_id: "3_0",
        sub_cats: {
          lossless: "3_14",
          lossy: "3_15"
        }
      },
      pictures: {
        category_id: "4_0",
        sub_categories: {
          photos: "4_17",
          graphics: "4_18"
        }
      },
      live_ation: {
        category_id: "5_0",
        sub_categories: {
          english_translated: "5_19",
          raw: "5_20",
          mon_english_translated: "5_21",
          idol_promotional_video: "5_22"
        }
      },
      software: {
        category_id: "6_0",
        sub_categories: {
          applications: "6_23",
          games: "6_24"
        }
      }
    };

    this.filters = {
      filter_remakes: 1,
      trusted_only: 2,
      a_only: 3
    };
  };

  requestData({ filter, category, sub_category, term }) {
    if (filter && !this.filters[filter]) return new Error(`${filter} is an invalid option for filter!`);
    if (category && !this.categories[category]) return new Error(`${category} is an invalid option for category!`);
    if (!category && sub_category) return new Error(`is an invalid option for`);
    if (category && sub_category && (!this.categories[category] || !this.categories[category].sub_categories[sub_category]))
      return new Error(`${category} is an invalid option for category or ${sub_category} is an invalid option for sub_category!`);

    const qs = {
      filter: this.filters[filter]
    };

    if (category && sub_category) {
      qs.cats = this.categories[category].sub_categories[sub_category]
    } else if (category) {
      qs.cats = this.categories[category].category_id;
    }

    if (term) {
      qs.term = term;
      qs.page = "search";
    }

    return this.helper.get(qs);
  };

  formatData($) {
    const torrents = [];

    $("tr.tlistrow").each(function(element) {
      const category = $(this).find("td.tlisticon").find("a").attr("title").replace(/\>\>.*/g, "").replace(/\s+/g, "");
      const sub_category = $(this).find("td.tlisticon").find("a").attr("title").replace(/.*\>\>/g, "").replace(/\s+/g, "")
      const torrent_name = $(this).find("td.tlistname").text();
      const torrent_link = `https:${$(this).find("td.tlistname").find("a").attr("href")}`;
      const download_link = `https:${$(this).find("td.tlistdownload").find("a").attr("href")}`;
      const size = $(this).find("td.tlistsize").text();
      const seeders = $(this).find("td.tlistsn").text();
      const leechers = $(this).find("td.tlistln").text();
      const peers = seeders + leechers;
      const downloads = $(this).find("td.tlistdn").text();
      const messages = $(this).find("td.tlistmn").text();

      torrents.push({ category, sub_category, torrent_name, torrent_link, download_link, size, seeders, leechers, peers, downloads, messages });
    });

    return torrents;
  };

  executeSearch({ filter, category, sub_category, term }) {
    return this.requestData({ filter, category, sub_category, term })
      .then(data => this.formatData(data))
      .catch(err => new Error(err));
  };

};
