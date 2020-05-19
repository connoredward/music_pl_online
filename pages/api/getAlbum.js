var SpotifyWebApi = require('spotify-web-api-node')

export default async ({body}, res) => {
  const {item, token} = body

  var spotifyApi = new SpotifyWebApi({
    accessToken: token.access_token
  })
  spotifyApi.getAlbum(item)
    .then(function(data) {
      res.json(data.body)
    }, function(err) {
      console.error(err)
    })
}