'use strict';

const cheerio = require('cheerio');
const querystring = require('querystring');
const got = require('got');

module.exports = class NyaaAPI {

  constructor({baseUrl = 'https://nyaa.si', debug = false} = {}) {
    NyaaAPI._baseUrl = baseUrl;
    this._debug = debug;

    this._categories = {
      all_categories: {
        category_id: '0_0'
      },
      anime: {
        category_id: '1_0',
        sub_categories: {
          anime_music_video: '1_1',
          english_translated: '1_2',
          non_english_translated: '1_3',
          raw: '1_4'
        }
      },
      audio: {
        category_id: '2_0',
        sub_cats: {
          lossless: '2_1',
          lossy: '2_2'
        }
      },
      literature: {
        category_id: '3_0',
        sub_categories: {
          english_translated: '3_1',
          non_english_translated: '3_2',
          raw: '3_3'
        }
      },
      live_action: {
        category_id: '4_0',
        sub_categories: {
          english_translated: '4_1',
          idol_promotional_video: '4_2',
          non_english_translated: '4_3',
          raw: '4_4',
        }
      },
      pictures: {
        category_id: '5_0',
        sub_categories: {
          graphics: '5_1',
          photos: '5_2'
        }
      },
      software: {
        category_id: '6_0',
        sub_categories: {
          applications: '6_1',
          games: '6_2'
        }
      }
    };

    this._filters = {
      no_filter: 0,
      filter_remakes: 1,
      trusted_only: 2,
      a_only: 3
    };

    this._sorters = {
      size: 'size',
      date: 'id',
      seeders: 'seeders',
      leechers: 'leechers',
      downloads: 'downloads'
    };
    this._orders = {
      asc: 'asc',
      desc: 'desc'
    };
  }

  _get(data = {}) {
    if (this._debug)
      console.warn(`Making request to: '${NyaaAPI._baseUrl}', opts: ${querystring.stringify(data)}`);

    return got(NyaaAPI._baseUrl, {
      method: 'GET',
      query: data
    }).then(({body}) => cheerio.load(body));
  }

  _requestData({ filter = 'no_filter', category = 'all_categories', sub_category, query = '', page = 0, sort, order = 'desc' }) {
    if (filter && !this._filters[filter])
      throw new Error(`${filter} is an invalid option for filter!`);

    if (category && !this._categories[category])
      throw new Error(`${category} is an invalid option for category!`);

    if (sort && !this._sorters[sort])
      throw new Error(`${sort} is an invalid option for sort!`);

    if (!category && sub_category)
      throw new Error('Sub category needs a category!');

    if (category && sub_category && (!this._categories[category] || !this._categories[category].sub_categories[sub_category]))
      throw new Error(`${category} is an invalid option for category or ${sub_category} is an invalid option for sub_category!`);

    const qs = {
      q: query,
      f: this._filters[filter],
      p: page,
      s: this._sorters[sort],
      o: order
    };

    if (category && sub_category) {
      qs.c = this._categories[category].sub_categories[sub_category]
    } else if (category) {
      qs.c = this._categories[category].category_id;
    }

    return this._get(qs);
  }

  _formatData($) {
    const result = {
      /**
       * TODO: Currently the site is limited to 1000 torrents (14 pages) when
       * the query option is used. `total_pages` could be replaced with a
       * `hasMore` property.
       */
      total_pages: 1,
      results: []
    };

    $('tr.success').each(function(element) {
      const entry = $(this).find('td');

      // TODO: add categories to results.
      // const categoryRegex = /(\w+)\s+-\s+(.*)/;
      // const completeCategory = entry.eq(0).find('a')
                                                // .attr('title');
      // const category = completeCategory.match(categoryRegex)[1];
      // const sub_category = completeCategory.match(categoryRegex)[2];

      const title = entry.eq(1).find('a').text();
      const link = `${NyaaAPI._baseUrl}${entry.eq(1).find('a').attr('href')}`;
      const torrent_link = `${NyaaAPI._baseUrl}${entry.eq(2).find('a').eq(0).attr('href')}`;
      const magnet = entry.eq(2).find('a').eq(1).attr('href');
      const size = entry.eq(3).text();
      const date = new Date(entry.eq(4).text());
      const seeders = parseInt(entry.eq(5).text(), 10);
      const leechers = parseInt(entry.eq(6).text(), 10);
      const peers = seeders + leechers;
      const downloads = parseInt(entry.eq(7).text(), 10);

      result.results.push({
        // category,
        // sub_category,
        title,
        link,
        torrent_link,
        magnet,
        size,
        seeders,
        leechers,
        peers,
        downloads
      });
    });

    return result;
  }

  search({ filter, category, sub_category, query, page, sort, order }) {
    return this._requestData({
      filter,
      category,
      sub_category,
      query,
      page,
      sort,
      order
    }).then(this._formatData);
  }

}
