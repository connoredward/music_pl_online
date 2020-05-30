var SpotifyWebApi = require('spotify-web-api-node')

export default async ({body}, res) => {
  const {item, token} = body

  var spotifyApi = new SpotifyWebApi({
    accessToken: token.access_token
  })
  spotifyApi.searchTracks(`artist:${item.search}`)
    .then((data) => {
      res.json(data.body)
    }, (err) => {
      console.log('Something went wrong!', err);
  });
}