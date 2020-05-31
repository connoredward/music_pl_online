var { getChart } =  require('billboard-top-100')
var SpotifyWebApi = require('spotify-web-api-node')

async function getSongData ({track, artist, token}) {
  console.log(track, artist, token)
  console.log()
  return await new Promise((res, rej) => {
    var spotifyApi = new SpotifyWebApi({
      accessToken: token.access_token
    })
    spotifyApi.searchTracks(`track:${track.replace(/'/g, '')} artist:${artist.replace(/'/g, '').split('Featuring')[0]}`) 
      .then((data) => {
        res(data.body)
      },(err) => {
        console.log('error:', err)
      })
  })
}

export default async ({body}, res) => {
  const {token} = body

  const arr = await new Promise((resolve, reject) => {
    getChart((err, chart) => {
      if (err) console.log('error msg : ', err)
      resolve(chart)
    })
  })
  res.json(await Promise.all(
    arr.songs.splice(0, 10).map(({artist, title}) => {return getSongData({track: title, artist, token})})
  ))
}
