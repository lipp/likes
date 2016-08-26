var request = require('request')
var cheerio = require('cheerio')

var getProfile = module.exports._getProfile = function (conf, done) {
  // hide as curl
  request({
    url: conf.url,
    headers: {
      'User-Agent': 'curl/7.43',
      'accept': '*/*'
    }
  }, function (error, _, body) {
    if (error) {
      done(error)
      return
    }
    try {
      done(null, conf.extractLikes(body))
    } catch (err) {
      done(err)
    }
  })
}

/**
 * @typdef {function} doneCallback
 * @param {Error} error Set in case of any error
 * @param {Number} count The number of likes/followers
 */

/**
 * @function twitter
 *
 * Queries a user's follower number
 * @param {string} The user id (without "@")
 * @param {doneCallback} done The classic done callback
 */
module.exports.twitter = function (id, done) {
  getProfile({
    url: 'https://twitter.com/' + id,
    extractLikes: function (body) {
      var selector = '.ProfileNav-item--followers a'
      var description = cheerio.load(body)(selector).attr('title')
      var likesText = description.match(/([0-9,\.]+)\s/)[1]
      return parseInt(likesText.replace(/[\.,\s]/g, ''))
    }
  }, done)
}

/**
 * @function facebook
 *
 * Queries a user's / object's / page's likes number
 * @param {string} The user / object / page id
 * @param {doneCallback} done The classic done callback
 */
module.exports.facebook = function (id, done) {
  getProfile({
    url: 'https://www.facebook.com/' + id + '/likes',
    extractLikes: function (body) {
      var selector = 'meta[name="description"]'
      var description = cheerio.load(body)(selector).attr('content')
      var likesText = description.match(/[^0-9]+\s([0-9,\.]+)\s/)[1]
      return parseInt(likesText.replace(/[\.,\s]/g, ''))
    }
  }, done)
}

/**
 * @function twitter
 *
 * Queries a user's follower number
 * @param {string} The user id (without "@")
 * @param {doneCallback} done The classic done callback
 */
module.exports.instagram = function (id, done) {
  getProfile({
    url: 'https://www.instagram.com/' + id,
    extractLikes: function (body) {
      var description = body.match(/"followed_by":\s*\{"count":\s*([0-9]+)/)[1]
      return parseInt(description.replace(/[\.,\s]/g, ''))
    }
  }, done)
}

/**
 * @function youtube
 *
 * Queries a user's subscriber number
 * @param {string} The user id (without "@")
 * @param {doneCallback} done The classic done callback
 */
module.exports.youtube = function (id, done) {
  getProfile({
    url: 'https://www.youtube.com/user/' + id,
    extractLikes: function (body) {
      var selector = '.subscribed'
      var description = cheerio.load(body)(selector).text()
      var likesText = description.match(/([0-9,\.]+)/)[1]
      return parseInt(likesText.replace(/[\.,\s]/g, ''))
    }
  }, done)
}
