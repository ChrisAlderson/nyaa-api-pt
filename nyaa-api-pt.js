'use strict'

const querystring = require('querystring')
const got = require('got')

module.exports = class NyaaAPI {

  constructor({
    baseUrl = 'https://nyaa.pantsu.cat',
    apiToken = '',
    debug = false
  } = {}) {
    this._baseUrl = baseUrl
    this._apiToken = apiToken
    this._debug = debug

    NyaaAPI._categories = {
      all_categories: {
        categoryId: '_'
      },
      anime: {
        categoryId: '3_',
        subCategories: {
          anime_music_video: '3_12',
          english_translated: '3_5',
          non_english_translated: '3_13',
          raw: '3_6'
        }
      },
      audio: {
        categoryId: '2_',
        subCategories: {
          lossless: '2_3',
          lossy: '2_4'
        }
      },
      literature: {
        categoryId: '4_',
        subCategories: {
          english_translated: '4_7',
          raw: '4_8',
          non_english_translated: '4_14'
        }
      },
      live_action: {
        categoryId: '5_',
        subCategories: {
          english_translated: '5_9',
          idol_promotional_video: '5_10',
          non_english_translated: '5_18',
          raw: '5_11'
        }
      },
      pictures: {
        categoryId: '6_',
        subCategories: {
          graphics: '6_15',
          photos: '6_16'
        }
      },
      software: {
        categoryId: '1_',
        subCategories: {
          applications: '1_1',
          games: '1_2'
        }
      }
    }
    NyaaAPI._filters = {
      show_all: 0,
      filter_remakes: 1,
      trusted_only: 2,
      a_only: 3
    }
    NyaaAPI._sorters = {
      name: 1,
      seeders: 5,
      downloads: 6,
      leechers: 7,
      date: 2,
      size: 4
    }
  }

  _request(method, uri, data = {}) {
    if (this._debug) {
      console.warn(`Making request to: '${this._baseUrl}/${uri}/${querystring.stringify(data)}`)
    }

    return got(`${this._baseUrl}/${uri}`, {
      method,
      headers: {
        authorization: this._apiToken
      },
      json: true,
      body: data
    }).then(({body}) => body)
  }

  search({
    filter = 'show_all',
    category = 'all_categories',
    subCategory,
    query = '',
    page = 1,
    sort,
    order = false,
    max = 50,
    userID
  } = {}) {
    // if (filter && NyaaAPI._filters[filter] === 0 && NyaaAPI._filters[filter]) {
    //   throw new Error(`${filter} is an invalid option for filter!`) // TODO: test this line.
    // }

    if (sort && !NyaaAPI._sorters[sort]) {
      throw new Error(`${sort} is an invalid option for sort!`)
    }

    if (category && !NyaaAPI._categories[category]) {
      throw new Error(`${category} is an invalid option for category!`)
    }

    if (!category && subCategory) {
      throw new Error('Sub category needs a category!')
    }

    if (category && subCategory && (!NyaaAPI._categories[category] ||
        !NyaaAPI._categories[category].subCategories[subCategory])) {
      throw new Error(`${category} is an invalid option for category or ${subCategory} is an invalid option for subCategory!`) // TODO: test this line.
    }

    const qs = {
      q: query,
      s: NyaaAPI._filters[filter],
      max,
      userID,
      sort: NyaaAPI._sorters[sort],
      o: order
    }

    if (category && subCategory) {
      qs.c = NyaaAPI._categories[category].subCategories[subCategory] // TODO: test this line.
    } else if (category) {
      qs.c = NyaaAPI._categories[category].category_id
    }

    return this._request('GET', `api/search/${page}`, qs)
  }

  getTorrents({page = 1, max = 50} = {}) {
    return this._request('GET', `api/${page}`, { max })
  }

  getTorrent(id) {
    return this._request('GET', `api/view/${id}`)
  }

  // upload({name, category, subCategory, description, hash}) {
  //   if (category && !NyaaAPI._categories[category]) {
  //     throw new Error(`${category} is an invalid option for category!`)
  //   }
  //
  //   if (!category && subCategory) {
  //     throw new Error('Sub category needs a category!')
  //   }
  //
  //   if (category && subCategory && (!NyaaAPI._categories[category] ||
  //       !NyaaAPI._categories[category].sub_categories[subCategory])) {
  //     throw new Error(`${category} is an invalid option for category or ${subCategory} is an invalid option for subCategory!`)
  //   }
  //
  //   return this._request('POST', '/api/upload', {
  //     name,
  //     category,
  //     sub_category: subCategory,
  //     description,
  //     hash
  //   })
  // }

  // update() {
  //   return this._request('PUT', '/api/update')
  // }

}
