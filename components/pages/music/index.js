import {useState, useEffect, useContext} from 'react'

import fetch from 'isomorphic-unfetch'
import classNames from 'classnames'

import PageWrapper from '~/componeonts/layout/pageWrapper'
import MediaCard from '~/components/layout/mediaCard'
import SearchMedia from '~/components/layout/searchMedia'

import {Context as SongContext} from '~/store/song'

import styles from './styles.scss'

async function callRoute({route, val}) {
  return await new Promise(async(res, rej) => {
    const headers = {'Content-Type': 'application/json'}
    const response = await fetch(route, {
      method: 'POST', 
      body: JSON.stringify({val}),
      headers
    })
    res(await response.json())
  })
}

export function MusicPage({slug}) {
  const {
    setSong,
    addSongList,
    songList,
    addPageSongList,
    pageSongList,
    sortPlaylists
  } = useContext(SongContext)

  const [albumInfo, setAlbumInfo] = useState()
  const [pitchforkReview, setPitchforkReview] = useState({})

  useEffect(() => {
    onLoad()
    if (window) window.scrollTo(0,0)
  }, [slug])

  async function onLoad() {
    const songData = await callRoute({route: slug.length === 4 || typeof slug === 'number' ? '/api/getSongData' : '/api/getAlbumData', val: slug})
    addPageSongList(songData)
    if (songList.length === 0) addSongList(songData)
    
    if (slug.length > 6) getAlbumInfo(songData.href.split('/')[5])
  }

  async function getAlbumInfo(albumId) {
    const songData = await callRoute({route: '/api/getAlbum', val: albumId})
    if (songData.album_type === 'album') {
      setAlbumInfo({artist: body.artists[0].name, album: body.name, albumImg: body.images[1].url}) 
      getPitchForkData({artist:body.artists[0].name, album: body.name})
    }
  }

  async function getPitchForkData(props) {
    const body = await callRoute({route: '/api/getPitchforkData', val: props})
    setPitchforkReview(body)
  }

  if (!songList) return (<div className={styles['loading_state']}>Loading...</div>)

  return (
    <PageWrapper className={styles['playlist_page']}>
      <div className={styles['album_wrapper']}>
        {albumInfo && (
          <>
            <div className={styles['album_description']}>
              <h1>{albumInfo.artist}</h1>
              <h2>{albumInfo.album}</h2>
              {slug.length > 6 && (
                <>
                  {pitchforkReview[0] 
                    ? <div className={styles['pitchfork-content']}>
                        <p>{pitchforkReview[0].editorial.abstract} <a href={`https://pitchfork.com${pitchforkReview[0].url}`} target='_blank'>[full article]</a></p>
                        <div className={classNames(styles['pitchfork-score'], styles[pitchforkReview[0].score >= 9 ? 'red' : 'black'])}><span>{pitchforkReview[0].score}</span></div>
                      </div>
                    : <span>Loading...</span>
                  }
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className={styles['card_grid']}>
        {pageSongList.tracks && pageSongList.tracks.items && (
          pageSongList.tracks.items.map((item) => <MediaCard {...item} onClick={e => setSong(e) & sortPlaylists()} />)
        )}
        {pageSongList.items && (
          pageSongList.items.map((item) => 
            <SearchMedia {...item} 
              imgPre={albumInfo && albumInfo.albumImg ? albumInfo.albumImg : undefined} 
              album={albumInfo && albumInfo.albumImg ? albumInfo.album : undefined}
              onClick={e => 
                setSong({...e, 
                  imgPre: albumInfo && albumInfo.albumImg 
                    ? albumInfo.albumImg 
                    : undefined, 
                  album: albumInfo && albumInfo.albumImg 
                    ? albumInfo.album 
                    : undefined
                  }) 
                & sortPlaylists()
              } 
            />)
          )}
      </div>
    </PageWrapper>
  )
}

export default MusicPage