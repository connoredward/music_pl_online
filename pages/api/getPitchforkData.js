var p4k = require('pitchfork')

export default async ({body}, res) => {
  const {item} = body
  const {artist, album} = item
  var search = new p4k.Search(`${artist} - ${album}`);
  search.promise
    .then((results) =>{
      var reviews = results.map(r =>{ return r.attributes })
      res.send(reviews)
    }, (err) => {
      console.log(err)
    })
}