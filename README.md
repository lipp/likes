# likes
Easily query social media likes/followers without tokens (for node).

__NO TOKENS REQUIRED__

[![API Doc](https://doclets.io/lipp/likes/master.svg)](https://doclets.io/lipp/likes/master) [![Build Status](https://travis-ci.org/lipp/likes.svg?branch=master)](https://travis-ci.org/lipp/likes) 

# Installation

    $ npm install likes

# Example

```js
var likes = require('likes')

likes.twitter('BarackObama', function (err, count) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Barack has', count, 'followers on Twitter')
})


```

# support social media platforms

- Facebook
- Twitter
- Instagram
- Youtube

# API

[![API Doc](https://doclets.io/lipp/likes/master.svg)](https://doclets.io/lipp/likes/master)

# How it works

The module uses simple HTTP GET to query the respective counts. So far NO headless browser like phantomjs is employed.
As the respective page layout may change, this approach is pretty fragile.

Keep in mind that the respective platform may rate-limit / blacklist you in case of "excessive" usage.

Contribution is very welcomed!
