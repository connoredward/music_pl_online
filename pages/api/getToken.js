var SpotifyWebApi = require('spotify-web-api-node')

export default async (req, res) => {
  var spotifyApi = new SpotifyWebApi({
    clientId: '75d2cf6e117744328b7fe49c11d8a79e',
    clientSecret: 'e3b8bada5da94804ae54b4abe7dddcea',
  })
  
  spotifyApi.clientCredentialsGrant()
    .then((data) => {
      res.json(data.body)
    },(err) => {
      console.log('Something went wrong!', err)
    })
}