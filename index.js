// Import the necessary modules.
const debug = require('debug')
const got = require('got')
const { stringify } = require('querystring')

const { name } = require('./package')

/**
 * The torrent model.
 * @typedef {Object} Torrent
 * @property {number} id ID of the torrent.
 * @property {string} name Name of the torrent.
 * @property {number} status Status of the torrent.
 * @property {string} hash Hash of the torrent.
 * @property {string} date Uploaded date of the torrent.
 * @property {number} filesize File size in Bytes of the torrent.
 * @property {string} description Description of the torrent.
 * @property {Array<Object>} comments Comments of the torrent.
 * @property {string} sub_category Sub Category of the torrent.
 * @property {string} category Category of the torrent.
 * @property {string} anidb_id Anidb ID of the torrent.
 * @property {number} uploader_id ID of the torrent uploader.
 * @property {string} uploader_name  Username of the torrent uploader.
 * @property {string} uploader_old  Old username from nyaa of the torrent
 * uploader.
 * @property {string} website_link  External Link of the torrent.
 * @property {Array<String>} languages  Languages of the torrent.
 * @property {string} magnet  Magnet URI of the torrent.
 * @property {string} torrent  Download URL of the torrent.
 * @property {number} seeders  Number of seeders of the torrent.
 * @property {number} leechers  Number of leechers of the torrent.
 * @property {number} completed  Downloads completed of the torrent.
 * @property {string} last_scrape  Last statistics update of the torrent.
 * @property {Array<Object>} file_list  List of files in the torrent.
 */

/**
 * The upload and update response model.
 * @typedef {Object} UploadUpdateResponse
 * @property {Boolean} ok The request is done without failing.
 * @property {String[]} infos Messages information relative to the request
 * @property {Torrent} data The resulting torrent uploaded.
 */

/**
 * The query response model.
 * @typedef {Object} QueryResponse
 * @property {Array<Torrent>} torrents List of torrent object.
 * @property {number} queryRecordCount Number of torrents given.
 * @property {number} totalRecordCount Total number of torrents.
 */

/**
 * The profile model.
 * @typedef {Object} Profile
 * @property {Boolean} ok The request is done without failing.
 * @property {String[]} infos Messages information relative to the request.
 * @property {User} data The connected user object.
 */

/**
 * The user model.
 * @typedef {Object} User
 * @property {number} user_id The id of the user.
 * @property {string} username The username of the user.
 * @property {number} status The status of the user.
 * @property {string} token The token of the user.
 * @property {string} md5 The md5 hash of the user.
 * @property {Date} created_at The time the user was created.
 * @property {number} liking_count The likes of the user.
 * @property {number} liked_count The amount of likes the user has given.
 */

/**
 * A nyaa.pantsu.cat API wrapper for NodeJS
 * @type {NyaaApi}
 */
module.exports = class NyaaApi {

  /**
   * Create a new instance of the module.
   * @param {!Object} config={} - The configuration object for the module.
   * @param {!string} baseUrl=https://nyaa.pantsu.cat/ - The base url of nyaa.pantsu.
   * @params {!string} apiToken - Your API token.
   * @param {?boolean} [debug=false] - Show extra output.
   */
  constructor({
    baseUrl = 'https://nyaa.pantsu.cat/',
    apiToken
  }) {
    /**
     * The base url of nyaa.pantsu.
     * @type {string}
     */
    this._baseUrl = baseUrl
    /**
     * Your API token.
     * @type {string}
     */
    this._apiToken = apiToken
    /**
     *  Show extra output.
     * @type {string}
     */
    this._debug = debug(name)
    /**
     * The sorters for searching.
     * @type {Object}
     */
    this._sorters = {
      id: 0,
      name: 1,
      date: 2,
      downloads: 3,
      size: 4,
      seeders: 5,
      leechers: 6,
      completed: 7
    }
  }

  /**
   * Send a HTTP request to the API of nyaa.pantsu.
   * @param {!string} method - The method of the of HTTP.
   * @param {!string} endpoint - The endpoint to send the request to.
   * @param {?Object} query - The query to send with the request.
   * @returns {Promise<Object, Error>} - The promise to send a HTTP request.
   */
  _request(method, endpoint, query) {
    const uri = `${this._baseUrl}${endpoint}`

    this._debug(`Making request to: '${uri}?${stringify(query)}'`)

    return got(uri, {
      method,
      headers: {
        authorization: this._apiToken
      },
      json: true,
      form: true,
      body: query,
      query
    }).then(({body}) => body)
  }

  /**
   * Send a HTTP GET request to the API of nyaa.pantsu.
   * @param {!string} endpoint - The endpoint to send the GET request to.
   * @param {?Object} query - The query to send with the GET request.
   * @returns {Promise<Object, Error>} - The promise to send a HTTP GET
   * request.
   */
  _get(endpoint, query) {
    return this._request('GET', endpoint, query)
  }

  /**
   * Send a HTTP HEAD request to the API of nyaa.pantsu.
   * @param {!string} endpoint - The endpoint to send the HEAD request to.
   * @param {?Object} query - The query to send with the HEAD request.
   * @returns {Promise<Object, Error>} - The promise to send a HTTP HEAD
   * request.
   */
  _head(endpoint, query) {
    return this._request('HEAD', endpoint, query)
  }

  /**
   * Send a HTTP POST request to the API of nyaa.pantsu.
   * @param {!string} endpoint - The endpoint to send the POST request to.
   * @param {?Object} query - The query to send with the POST request.
   * @returns {Promise<Object, Error>} - The promise to send a HTTP POST
   * request.
   */
  _post(endpoint, query) {
    return this._request('POST', endpoint, query)
  }

  /**
   * Search for torrents.
   * @param {!Object} config - The configuration for the method.
   * @param {Array<string>} config.c - In which categories to search.
   * @param {string} config.q - Query to search (torrent name).
   * @param {number} config.page - Page of the search results.
   * @param {string} config.limit - Number of results per page.
   * @param {string} config.userID - Uploader ID owning the torrents.
   * @param {string} config.fromID - Show results with torrents ID superior to
   * this.
   * @param {string} config.s - Torrent status.
   * @param {string} config.maxage - Torrents which have been uploaded the last
   * x days.
   * @param {string} config.toDate - Torrents which have been uploaded since
   * dateType.
   * @param {string} config.fromDate - Torrents which have been uploaded the
   * last dateType.
   * @param {string} config.dateType - Which type of date (d for days, m for
   * months, y for years).
   * @param {string} config.minSize - Filter by minimal size in sizeType.
   * @param {string} config.maxSize - Filter by maximal size in sizeType.
   * @param {string} config.sizeType - Which type of size (b for bytes, k for
   * kilobytes, m for megabytes, g for gigabytes).
   * @param {string} config.sort - Torrent sorting type (0 = id, 1 = name,
   * 2 = date, 3 = downloads, 4 = size, 5 = seeders, 6 = leechers,
   * 7 = completed).
   * @param {boolean} config.order - Order ascending or descending
   * (true = ascending).
   * @param {Array<string>} config.lang - Filter the languages.
   * @param {number} config.page - Search page.
   * @return {Promise<QueryResponse, Error>} - The promise to search for a list
   * of torrents.
   */
  search({
    c,
    q,
    page,
    limit,
    userID,
    fromID,
    s,
    maxage,
    toDate,
    fromDate,
    dateType,
    minSize,
    maxSize,
    sizeType,
    sort,
    order,
    lang
  } = {}) {
    const sortBy = typeof sort === 'string' ? this._sorters[sort] : ''

    return this._get('api/search', {
      c,
      q,
      page,
      limit,
      userID,
      fromID,
      s,
      maxage,
      toDate,
      fromDate,
      dateType,
      minSize,
      maxSize,
      sizeType,
      sort: sortBy,
      order,
      lang
    })
  }

  /**
   * Get a torrent by the given id.
   * @param {number} id Torrent unique ID.
   * @return {Promise<Torrent, Error>} - The promise to get a torrent.
   */
  getTorrent(id) {
    return this._get(`api/view/${id}`)
  }

  /**
   * TODO: add description.
   * @param {number} id Torrent unique ID.
   * @return {Promise<Torrent, Error>} - The promise to get a torrent.
   */
  getTorrentHead(id) {
    return this._head(`api/view/${id}`)
  }

  /**
   * Upload a new torrent.
   * @param {!Object} config - The configuration for the method.
   * @param {string} config.username - Torrent uploader name.
   * @param {string} config.name - Torrent name.
   * @param {string} config.magnet - Torrent magnet URI.
   * @param {string} config.category - Torrent category.
   * @param {boolean} config.remake - Torrent is a remake.
   * @param {string} config.description - Torrent description.
   * @param {number} config.status - Torrent status.
   * @param {boolean} config.hidden - Torrent hidden.
   * @param {string} config.websiteLink - Torrent website link.
   * @param {Array<string>} config.languages - Torrent languages.
   * @param {String} config.torrent - Torrent file to upload (you have to send
   * a torrent file or a magnet, not both!).
   * @returns {Promise<UploadUpdateResponse, Error>} - The promise to upload a
   * torrent.
   */
  uploadTorrent({
    username,
    name,
    magnet,
    category,
    remake,
    description,
    status,
    hidden,
    websiteLink,
    languages,
    torrent
  }) {
    // TODO: test this method.
    return this._post('api/upload', {
      username,
      name,
      magnet,
      category,
      remake,
      description,
      status,
      hidden,
      website_link: websiteLink,
      languages,
      torrent
    })
  }

  /**
   * Update an existing torrent.
   * @param {!Object} config - The configuration for the method.
   * @param {string} config.username - Torrent uploader name.
   * @param {number} config.id - Torrent ID.
   * @param {string} config.name - Torrent name.
   * @param {string} config.category - Torrent category.
   * @param {boolean} config.remake - Torrent is a remake.
   * @param {string} config.description - Torrent description.
   * @param {number} config.status - Torrent status.
   * @param {boolean} config.hidden - Torrent hidden.
   * @param {string} config.websiteLink - Torrent website link.
   * @param {Array<string>} config.languages - Torrent languages.
   * @returns {Promise<UploadUpdateResponse, Error>} - The promise to update a
   * torrent.
   */
  updateTorrent({
    username,
    id,
    name,
    category,
    remake,
    description,
    status,
    hidden,
    websiteLink,
    languages
  }) {
    // TODO: test this method.
    return this._post('api/update', {
      username,
      id,
      name,
      category,
      remake,
      description,
      status,
      hidden,
      website_link: websiteLink,
      languages
    })
  }

  /**
   * Login with a username and password.
   * @param {string} username - Username or Email.
   * @param {string} password - Password.
   * @returns {Promise<Profile, Error>} - The promise to login with a username
   * and password.
   */
  login({username, password}) {
    return this._post('api/login', {
      username,
      password
    })
  }

  /**
   * Get a profile based on the given id.
   * @param {Number} id - User ID.
   * @return {Promise<Profile, Error>} - The promise ot get a profile.
   */
  getProfile(id) {
    return this._get(`api/profile`, { id })
  }

}
