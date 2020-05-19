import fetch from 'isomorphic-unfetch'

async function callRoute({route, item, token}) {
  return await new Promise(async(res, rej) => {
    const headers = {'Content-Type': 'application/json'}
    const response = await fetch(route, {
      method: 'POST', 
      body: JSON.stringify({item, token}),
      headers
    })
    res(await response.json())
  })
}

async function getRoute({route}) {
  return await new Promise(async(res, rej) => {
    const headers = {'Content-Type': 'application/json'}
    const response = await fetch(route, {
      method: 'GET',
      headers
    })
    res(await response.json())
  })
}


export async function getPitchfork(props) {
  return await callRoute({route: '/api/getPitchforkData', item: props})
}

export async function getToken() {
  return await getRoute({route: '/api/getToken'})
}

const songListStruc = (songs, type) => {
  if (type === 'playlist') {
    const {track} = songs
    return {
      song: track.name,
      songId: track.id,
      artist: track.artists.map(({name, id}) => {
        return {
          name,
          id
        }
      }),
      album: track.album.name,
      albumCover: track.album.images[0].url,
      albumId: track.album.id
    }
  } else {
    const {name, artists, id} = songs
    return {
      song: name, 
      songId: id,
      artist: artists.map(({name}) => {return {name}})
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
    albumCover: images[0].url,
    songs: tracks.items.map(item => songListStruc(item, type))
  }
}

export async function getAlbum (item, token) {
  return sortData(await callRoute({route: '/api/getAlbum', item, token}))
}

export async function getPlaylist (item, token) {
  return sortData(await callRoute({route: '/api/getPlaylist', item, token}))
}

export async function getAllPlaylist (token) {
  console.log('token', token)
  const data = await callRoute({route: '/api/playlists', item: {}, token})
  console.log(data)
  return data.items.map(({id, images, name, owner, type}) =>{return {
      id,
      name,
      type,
      owner: owner.display_name,
      albumCover: images[0].url
    }}
  )
}

export default {
  getPitchfork,
  getPlaylist,
  getAlbum,
  getToken,
  getAllPlaylist
}