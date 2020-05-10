import fetch from 'isomorphic-unfetch'

function getUnique(arr, comp) {
  return arr.map(i => i[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((i) => arr[i]).map(i => arr[i])
}

export async function searchMusic(search) {
  const headers = {'Content-Type': 'application/json'}
    const response = await fetch('/api/searchSpotify', {
      method: 'POST',
      body: JSON.stringify({search}),
      headers
    })
    const body = await response.json()
    const compareThis = body.tracks.items.map((item) => {
      return {
        artist: item.artists[0].name, 
        album: item.album.name, 
        imgPre: item.album.images[1].url, 
        id: item.album.id
      }
    })
    
    return getUnique(compareThis, 'id')
}

export default searchMusic