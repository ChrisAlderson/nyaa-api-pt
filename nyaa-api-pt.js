'use strict';

const cheerio = require('cheerio');
const req = require('request');
const querystring = require('querystring');

const defaultOptions = {
  'baseUrl': 'https://www.nyaa.se/',
  'timeout': 3 * 1000
};

module.exports = class NyaaAPI {

  constructor({options = defaultOptions, debug = false} = {}) {
    this._request = req.defaults(options);
    this._debug = debug;

    this._categories = {
      anime: {
        category_id: '1_0',
        sub_categories: {
          english_translated: '1_37',
          raw: '1_11',
          non_english_translated: '1_38',
          anime_music_video: '1_32'
        }
      },
      literature: {
        category_id: '2_0',
        sub_categories: {
          english_translated: '2_12',
          raw: '2_13',
          non_english_translated: '2_39'
        }
      },
      audio: {
        category_id: '3_0',
        sub_cats: {
          lossless: '3_14',
          lossy: '3_15'
        }
      },
      pictures: {
        category_id: '4_0',
        sub_categories: {
          photos: '4_17',
          graphics: '4_18'
        }
      },
      live_ation: {
        category_id: '5_0',
        sub_categories: {
          english_translated: '5_19',
          raw: '5_20',
          non_english_translated: '5_21',
          idol_promotional_video: '5_22'
        }
      },
      software: {
        category_id: '6_0',
        sub_categories: {
          applications: '6_23',
          games: '6_24'
        }
      }
    };

    this._filters = {
      filter_remakes: 1,
      trusted_only: 2,
      a_only: 3
    };
  };

  _get(qs, retry = true) {
    if (this._debug) console.warn(`Making request with parameters: ${querystring.stringify(qs)}`);
    return new Promise((resolve, reject) => {
      this._request({ uri: '', qs }, (err, res, body) => {
        if (err && retry) {
          return resolve(this._get(qs, false));
        } else if (err) {
          return reject(err);
        } else if (!body || res.statusCode >= 400) {
          return reject(new Error(`No data found for parameters: ${querystring.stringify(qs)}, statuscode: ${res.statusCode}`))
        } else {
          return resolve(cheerio.load(body));
        }
      });
    });
  };

  _requestData({ filter, category, sub_category, term, user, offset }) {
    if (filter && !this._filters[filter]) return new Error(`${filter} is an invalid option for filter!`);
    if (category && !this._categories[category]) return new Error(`${category} is an invalid option for category!`);
    if (!category && sub_category) return new Error(`is an invalid option for`);
    if (category && sub_category && (!this._categories[category] || !this._categories[category].sub_categories[sub_category]))
      return new Error(`${category} is an invalid option for category or ${sub_category} is an invalid option for sub_category!`);

    const qs = {};
    if (term) {
      qs.term = term;
      qs.page = 'search';
    }

    if (filter) qs.filter = this._filters[filter];
    if (user) qs.user = user;
    if (offset) qs.offset = offset;

    if (category && sub_category) {
      qs.cats = this._categories[category].sub_categories[sub_category]
    } else if (category) {
      qs.cats = this._categories[category].category_id;
    }

    return this._get(qs);
  };

  _formatData($) {
    const link = $('div.rightpages').find('a.page.pagelink').last().attr('href');

    let offset = 1;
    if (link) {
      const index = link.indexOf('?');
      offset = querystring.parse(link.substring(index + 1, link.length)).offset;
    }

    const result = {
      total_pages: offset,
      results: []
    };

    $('tr.tlistrow').each(function(element) {
      const category = $(this).find('td.tlisticon').find('a').attr('title').replace(/\>\>.*/g, '').replace(/\s+/g, '');
      const sub_category = $(this).find('td.tlisticon').find('a').attr('title').replace(/.*\>\>/g, '').replace(/\s+/g, '')
      const title = $(this).find('td.tlistname').text();
      const link = `https:${$(this).find('td.tlistname').find('a').attr('href')}`;
      const torrent_link = `https:${$(this).find('td.tlistdownload').find('a').attr('href')}`;
      const size = $(this).find('td.tlistsize').text();
      const seeders = parseInt($(this).find('td.tlistsn').text(), 10);
      const leechers = parseInt($(this).find('td.tlistln').text(), 10);
      const peers = parseInt(seeders + leechers, 10);
      const downloads = parseInt($(this).find('td.tlistdn').text(), 10);
      const messages = parseInt($(this).find('td.tlistmn').text(), 10);

      result.results.push({ category, sub_category, title, link, torrent_link, size, seeders, leechers, peers, downloads, messages });
    });

    return result;
  };

  search({ filter, category, sub_category, term, user, offset }) {
    return this._requestData({ filter, category, sub_category, term, user, offset })
      .then(data => this._formatData(data));
  };

};
