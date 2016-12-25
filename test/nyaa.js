'use strict';

const chai = require('chai');
const assert = chai.assert;
const NyaaAPI = require('../nyaa-api-pt');

describe('Nyaa', () => {

  let nyaa;
  before(() => nyaa = new NyaaAPI());

  it('Should get results with a search', done => {
    nyaa.search({
      term: 'horriblesubs',
      filter: 'trusted_only',
      category: 'anime',
      sub_category: 'english_translated',
      user: 64513,
      offset: 2
    }).then(res => {
      assert.isArray(res.results);
      done();
    }).catch(err => done(err));
  });

});
