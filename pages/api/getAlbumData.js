var SpotifyWebApi = require('spotify-web-api-node')

function getAccessToken() {
  var spotifyApi = new SpotifyWebApi({
    clientId: '75d2cf6e117744328b7fe49c11d8a79e',
    clientSecret: 'e3b8bada5da94804ae54b4abe7dddcea',
  });
  
  return new Promise ((res, rej) => {
    spotifyApi.clientCredentialsGrant().then(
      function(data) {
        res(data.body)
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    );
  })
}

export default async ({body}, res) => {
  const {item} = body
  const r = await getAccessToken()
  var spotifyApi = new SpotifyWebApi({
    accessToken: r.access_token
  })
  spotifyApi.getAlbumTracks(item)
  .then(function(data) {
    res.json(data.body)
  }, function(err) {
    console.error(err);
  });
}