import fetch from 'isomorphic-unfetch'

async function callRoute({route, item}) {
  return await new Promise(async(res, rej) => {
    const headers = {'Content-Type': 'application/json'}
    const response = await fetch(route, {
      method: 'POST', 
      body: JSON.stringify({item}),
      headers
    })
    res(await response.json())
  })
}


export async function getPitchfork(props) {
  return await callRoute({route: '/api/getPitchforkData', item: props})
}

const songListStruc = (songs, type) => {
  if (type === 'playlist') {
    const {track} = songs
    return {
      song: track.name,
      songId: track.id,
      artist: track.artists[0].name,
      artistId: track.artists[0].id,
      album: track.album.name,
      albumCover: track.album.images[1].url,
      albumId: track.album.id
    }
  } else {
    const {name, artists, id} = songs
    return {
      song: name, 
      songId: id,
      artist: artists[0].name
    }
  }
}

function sortData(props) {
  const {id, owner, artists, name, type, images, tracks} = props
  return {
    id,
    type,
    albumArtist: type === 'playlist' 
      ? owner.display_name 
      : artists[0].name,
    albumName: name,
    albumCover: images[1].url,
    songs: tracks.items.map(item => songListStruc(item, type))
  }
}

export async function sortMusicList (item) {
  const route = item.length === 4 ? '/api/getSongData' : '/api/getAlbumData'
  const body = await callRoute({route, item})

  if (body.type) {
    return sortData(body)
  } else {
    const x = body.href.split('/')
    const id = x[x.findIndex(type => type === 'albums') + 1]
    return sortData(await callRoute({route: '/api/getAlbum', item: id}))
  }
}

export default {
  sortMusicList,
  getPitchfork
}