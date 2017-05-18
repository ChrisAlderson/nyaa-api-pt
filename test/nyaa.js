'use strict';

const chai = require('chai');
const assert = chai.assert;
const NyaaAPI = require('../nyaa-api-pt');

describe('Nyaa', () => {

  let nyaa;
  before(() => nyaa = new NyaaAPI());

  it('Should get results with a search', done => {
    nyaa.search({
      query: 'horriblesubs',
      filter: 'trusted_only',
      category: 'anime',
      sub_category: 'english_translated',
      page: 2,
      sort: 'date',
      order: 'asc'
    }).then(res => {
      assert.isArray(res.results);
      done();
    }).catch(err => done(err));
  });

});
