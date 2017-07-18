'use strict'

const { expect } = require('chai')
const NyaaAPI = require('../nyaa-api-pt')

describe('Nyaa', () => {

  let nyaa

  before(() => {
    console.warn = () => {}
    nyaa = new NyaaAPI({
      debug: true
    })
  })

  it('should search for torrents', done => {
    nyaa.search({
      query: 'horriblesubs',
      filter: 'trusted_only',
      category: 'anime',
      sub_category: 'english_translated',
      page: 2,
      sort: 'date',
      order: false,
      max: 300,
      userID: 14
    }).then(res => {
      expect(res).to.be.an('array')
      expect(res.length).to.be.at.least(1)

      done()
    }).catch(done)
  })

  it('should throw an error when searching for torrents', () => {
    // expect(nyaa.search.bind(nyaa.search, {
    //   filter: 'failing'
    // })).to.throw('failing is an invalid option for filter!')
    expect(nyaa.search.bind(nyaa.search, {
      sort: 'failing'
    })).to.throw('failing is an invalid option for sort!')
    expect(nyaa.search.bind(nyaa.search, {
      category: 'failing'
    })).to.throw('failing is an invalid option for category!')
    expect(nyaa.search.bind(nyaa.search, {
      subCategory: 'failing'
    })).to.throw('failing')

    expect(nyaa.search.bind(nyaa.search, {
      category: null,
      subCategory: 'failing'
    })).to.throw('Sub category needs a category!')
  })

  it('should get torrents from a page', done => {
    nyaa.getTorrents({
      max: 50,
      page: 1
    }).then(res => {
      expect(res.torrents).to.be.an('array')
      expect(res.torrents.length).to.be.at.least(1)
      expect(res.queryRecordCount).to.be.a('number')
      expect(res.totalRecordCount).to.be.a('number')

      done()
    }).catch(done)
  })

  it('should get details on a torrent', done => {
    nyaa.getTorrent(924727).then(res => {
      expect(res.id).to.be.a('number')
      expect(res.name).to.be.a('string')
      expect(res.hash).to.be.a('string')
      expect(res.magnet).to.be.a('string')

      done()
    }).catch(done)
  })

  // it('should upload a torrent', () => {
  //   nyaa.upload({
  //     name,
  //     category,
  //     subCategory,
  //     description,
  //     hash
  //   }).then(res => {
  //     done()
  //   }).catch(done)
  // })
  //
  // it('should update a torrent', () => {
  //
  // })

})
