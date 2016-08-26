/* globals describe it */
var assert = require('assert')
var likes = require('../')

describe('likes', function () {
  this.timeout(5000)

  it('twitter', function (done) {
    likes.twitter('heidiklum', function (err, count) {
      assert.ok(count > 1000000)
      done(err)
    })
  })

  it('facebook', function (done) {
    likes.facebook('HeidiKlum', function (err, count) {
      assert.ok(count > 1000000)
      done(err)
    })
  })

  it('instagram', function (done) {
    likes.instagram('heikolochmann', function (err, count) {
      assert.ok(count > 1000000)
      done(err)
    })
  })

  it('youtube', function (done) {
    likes.youtube('DieLochis', function (err, count) {
      assert.ok(count > 1000000)
      done(err)
    })
  })

  it('invalid account forwards error', function (done) {
    likes.youtube('ASLDKJASLDKJASLDKJ', function (err, count) {
      assert(!count)
      assert(err)
      done()
    })
  })

  it('forwards 404 error', function (done) {
    likes._getProfile('http://foo.bar/home/asd', function (err, count) {
      assert(!count)
      assert(err)
      done()
    })
  })
})
