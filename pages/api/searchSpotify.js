var SpotifyWebApi = require('spotify-web-api-node')

export default async ({body}, res) => {
  const {item, token} = body
  console.log(123, token)

  var spotifyApi = new SpotifyWebApi({
    accessToken: token.access_token
  })

  spotifyApi.searchTracks(`artist:${item}`)
    .then((data) => {
      res.json(data.body)
    }, (err) => {
      console.log('Something went wrong!', err);
  });
}