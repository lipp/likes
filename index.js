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
 * The callback function for each query method.
 * @callback doneCallback
 * @param {Error} error Set in case of any error
 * @param {Number} count The number of likes/followers
 */

/**
 * Queries a user's follower number
 *
 * @function
 * @name twitter
 * @param {string} id The user id (without "@")
 * @param {doneCallback} done The classic done callback
 */
module.exports.twitter = function (id, done) {
  getProfile({
    url: 'https://twitter.com/' + id,
    extractLikes: function (body) {
      var selector = '.ProfileNav-item--followers a'
      var description = cheerio.load(body)(selector).attr('title')
      var likesText = description.match(/([0-9,\.]+)\s/)[1]
      return parseInt(likesText.replace(/[\.,\s]/g, ''), 10)
    }
  }, done)
}

/**
 * Queries a user's / object's / page's likes number
 *
 * @function
 * @name facebook
 * @param {string} id The user / object / page id
 * @param {doneCallback} done The classic done callback
 */
module.exports.facebook = function (id, done) {
  getProfile({
    url: 'https://www.facebook.com/' + id + '/likes',
    extractLikes: function (body) {
      var selector = 'meta[name="description"]'
      var description = cheerio.load(body)(selector).attr('content')
      var likesText = description.match(/[^0-9]+\s([0-9,\.]+)\s/)[1]
      return parseInt(likesText.replace(/[\.,\s]/g, ''), 10)
    }
  }, done)
}

/**
 * Queries a user's / object's / page's likes number
 *
 * @function
 * @name pinterest
 * @param {string} id The user / object / page id
 * @param {doneCallback} done The classic done callback
 */
module.exports.pinterest = function (id, done) {
  getProfile({
    url: 'https://www.pinterest.com/' + id + '/followers',
    extractLikes: function (body) {
      var selector = 'meta[name="pinterestapp:followers"]'
      var description = cheerio.load(body)(selector).attr('content')
      return parseInt(description, 10)
    }
  }, done)
}

/**
 * Queries a user's / object's / page's likes number
 *
 * @function
 * @name googleplus
 * @param {string} id The user / object / page id
 * @param {doneCallback} done The classic done callback
 */
module.exports.googleplus = function (id, done) {
  getProfile({
    url: 'https://plus.google.com/' + id,
    extractLikes: function (body) {
      var selector = 'div[token="' + id + '/posts"] > div:first-child > div:first-child > div:first-child > div:nth-child(2) > div:first-child > div:first-child > div:first-child > span:first-child'
      var description = cheerio.load(body)(selector).text()
      return parseInt(description.replace(/[\.,]/g, ''), 10)
    }
  }, done)
}

/**
 * Queries a user's follower number
 *
 * @function
 * @name instagram
 * @param {string} id The user id (without "@")
 * @param {doneCallback} done The classic done callback
 */
module.exports.instagram = function (id, done) {
  getProfile({
    url: 'https://www.instagram.com/' + id,
    extractLikes: function (body) {
      var selector = 'meta[name="description"]'
      var description = cheerio.load(body)(selector).attr('content')
      var likesText = description.match(/([0-9\.]+)\s/)[1]
      return parseInt(likesText.replace(/[\.,\s]/g, ''))
    }
  }, done)
}

/**
 * Queries a user's subscriber number
 *
 * @function
 * @name youtube
 * @param {string} id The user id (without "@")
 * @param {doneCallback} done The classic done callback
 */
module.exports.youtube = function (id, done) {
  getProfile({
    url: 'https://www.youtube.com/user/' + id,
    extractLikes: function (body) {
      var selector = '.subscribed'
      var description = cheerio.load(body)(selector).text()
      var likesText = description.match(/([0-9,\.]+)/)[1]
      return parseInt(likesText.replace(/[\.,\s]/g, ''), 10)
    }
  }, done)
}
