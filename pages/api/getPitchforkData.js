var p4k = require('pitchfork')

export default async ({body}, res) => {
  const {item} = body
  const {artist, album} = item
  var search = new p4k.Search(`${artist} - ${album}`);
  search.promise.then(function(results){
    var reviews = results.map(function(r){ return r.attributes; })
    res.send(reviews)
  })
}