var likes = require('./')

likes.twitter('BarackObama', function (err, count) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Barack has', count, 'followers on Twitter')
})
