var SpotifyWebApi = require('spotify-web-api-node')

export default async ({body}, res) => {
  const {token} = body
  console.log('token', token)
  var spotifyApi = new SpotifyWebApi({
    accessToken: token.access_token
  })

  spotifyApi.getUserPlaylists('ouf6jimny7kufvht539y17yzr')
    .then((data) => {
      res.json(data.body)
    }, (err) => {
      console.log('Something went wrong!', err);
    })
}