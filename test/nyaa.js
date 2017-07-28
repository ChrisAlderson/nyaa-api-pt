'use strict'

// Import the necessary modules.
const { expect } = require('chai')
const NyaaApi = require('../nyaa-api-pt')

/** @test {NyaaApi} */
describe('NyaaApi', () => {
  /**
 * The NyaaApi instance.
 * @type {NyaaApi}
 */
  let nyaa

  /**
   * Hook for setting up the NyaaApi tests.
   * @type {Function}
   */
  before(() => {
    // Disable the warn logging function to testing.
    console.warn = () => {}

    nyaa = new NyaaApi({
      apiToken: process.env.NYAA_TOKEN,
      debug: true
    })
  })

  /**
   * Test the torrent attributes.
   * @param {Torrent} torrent - The torrent to test.
   * @returns {undefined}
   */
  function testTorrentAttributes(torrent) {
    expect(torrent).to.be.an('object')
    expect(torrent.id).to.be.a('number')
    expect(torrent.name).to.be.a('string')
    expect(torrent.status).to.be.a('number')
    expect(torrent.hash).to.be.a('string')
    expect(torrent.date).to.be.a('string')
    expect(torrent.filesize).to.be.a('number')
    expect(torrent.description).to.be.a('string')
    expect(torrent.comments).to.be.an('array')
    expect(torrent.sub_category).to.be.a('string')
    expect(torrent.category).to.be.a('string')
    expect(torrent.anidb_id).to.be.a('string')
    expect(torrent.uploader_id).to.be.a('number')
    expect(torrent.uploader_name).to.be.a('string')
    expect(torrent.uploader_old).to.be.a('string')
    expect(torrent.website_link).to.be.a('string')
    expect(torrent.languages).to.be.an('array')
    expect(torrent.magnet).to.be.a('string')
    expect(torrent.torrent).to.be.a('string')
    expect(torrent.seeders).to.be.a('number')
    expect(torrent.leechers).to.be.a('number')
    expect(torrent.completed).to.be.a('number')
    expect(torrent.last_scrape).to.be.a('string')
    expect(torrent.file_list).to.be.an('array')
  }

  /** @test {NyaaApi#getTorrent} */
  it('should get a torrent', done => {
    nyaa.getTorrent(962988).then(res => {
      testTorrentAttributes(res)
      done()
    }).catch(done)
  })

  /** @test {NyaaApi#getTorrentHead} */
  it('should get a torrent head', done => {
    // TODO: fix this test.

    // For branch coverage.
    nyaa = new NyaaApi({
      apiToken: process.env.NYAA_TOKEN
    })
    nyaa.getTorrentHead(962988).then(res => {
      expect(res).to.be.a('string')
      // testTorrentAttributes(res)
      done()
    }).catch(done)
  })

  /** @test {NyaaApi#uploadTorrent} */
  it('should upload a torrent', done => {
    // TODO: fix this test.

    // nyaa.uploadTorrent({
    //   username,
    //   name,
    //   magnet,
    //   category,
    //   remake,
    //   description,
    //   status,
    //   hidden,
    //   websiteLink,
    //   languages,
    //   torrent
    // }).then(res => {
    //   expect(res).to.be.an('object')
    //   done()
    // }).catch(done)

    done()
  })

  /** @test {NyaaApi#updateTorrent} */
  it('should update a torrent', done => {
    // TODO: fix this test.

    // nyaa.updateTorrent({
    //   username: process.env.NYAA_USER,
    //   id,
    //   name: 'test torrent',
    //   category: '3_5',
    //   remake: true,
    //   description: 'jist a test torrent',
    //   status: 0,
    //   hidden: 'tru',
    //   // websiteLink,
    //   languages: 'en'
    // }).then(res => {
    //   expect(res).to.be.an('object')
    //   done()
    // }).catch(done)

    done()
  })

  //** @test {NyaaApi#search} */
  it('should search for torrents with sort as a string', done => {
    nyaa.search({
      q: 'horriblesubs',
      page: 1,
      limit: 50,
      sort: 'id'
    }).then(res => {
      expect(res).to.be.an('object')
      expect(res.torrents).to.be.an('array')

      const random = Math.floor(Math.random() * res.torrents.length)
      testTorrentAttributes(res.torrents[random])

      done()
    }).catch(done)
  })

  /** @test {NyaaApi#search} */
  it('should search for torrents without parameters', done => {
    nyaa.search().then(res => {
      expect(res).to.be.an('object')
      expect(res.torrents).to.be.an('array')

      const random = Math.floor(Math.random() * res.torrents.length)
      testTorrentAttributes(res.torrents[random])

      done()
    }).catch(done)
  })

  /** @test {NyaaApi#login} */
  it('should login with a username and password', done => {
    nyaa.login({
      username: process.env.NYAA_USER,
      password: process.env.NYAA_PASS
    }).then(res => {
      expect(res).to.be.an('object')
      // expect(res.infos).to.be.an('array')
      expect(res.ok).to.be.a('boolean')

      const { data } = res
      expect(data).to.be.an('object')
      expect(data.user_id).to.be.an('number')
      expect(data.username).to.be.an('string')
      expect(data.status).to.be.an('number')
      expect(data.md5).to.be.an('string')
      expect(data.created_at).to.be.an('string')
      expect(data.liking_count).to.be.an('number')
      expect(data.liked_count).to.be.an('number')

      done()
    }).catch(done)
  })

  /** @test {NyaaApi#getProfile} */
  it('should get a profile by the id', done => {
    nyaa.getProfile(13803).then(res => {
      expect(res).to.be.an('object')
      // expect(res.infos).to.be.an('array')
      expect(res.ok).to.be.a('boolean')

      const { data } = res
      expect(data).to.be.an('object')
      expect(data.user_id).to.be.an('number')
      expect(data.username).to.be.an('string')
      expect(data.status).to.be.an('number')
      expect(data.md5).to.be.an('string')
      expect(data.created_at).to.be.an('string')
      expect(data.liking_count).to.be.an('number')
      expect(data.liked_count).to.be.an('number')

      done()
    }).catch(done)
  })

  // XXX: Endpoint is not on production yet.
  // /** @test {NyaaApi#getUser} */
  // it('should get a user of the api key', done => {
  //   nyaa.getUser().then(res => {
  //     expect(res).to.be.an('object')
  //     done()
  //   }).catch(done)
  // })

  /** @test {NyaaApi#refreshToken} */
  it('should refresh the api token', done => {
    //
    nyaa.refreshToken().then(res => {
      // TODO: fix this test.

      expect(res).to.be.an('object')
      done()
    }).catch(done)
  })

  /** @test {NyaaApi#checkToken} */
  it('should check the api token', done => {
    // TODO: fix this test.

    nyaa.checkToken().then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(done)
  })
})
