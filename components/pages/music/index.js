import {useState, useEffect, useContext} from 'react'

import classNames from 'classnames'

import PageWrapper from '~/components/layout/pageWrapper'
import MediaCard from '~/components/layout/mediaCard'
import SearchCard from '~/components/layout/searchMedia'

import {getPitchfork, getPlaylist, getAlbum, getToken} from '~api/spotify'

import {Context as SongContext} from '~/store/song'

import styles from './styles.scss'

export function MusicPage({slug, changeRoute}) {
  const {playlist, album} = slug

  const {
    setSong,
    addSongList,
    songList,
    sortPlaylists,
    accessToken,
    changeAccessToken
  } = useContext(SongContext)

  const [pageSongList, setPageSongList] = useState([])
  const [pitchforkReview, setPitchforkReview] = useState({})

  useEffect(() => {
    if (accessToken) onLoad()
    if (window) window.scrollTo(0,0)
  }, [slug, accessToken])

  async function onLoad() {
    setPageSongList([])
    if (new Date() - accessToken?.createdAt >= 3600000) changeAccessToken(await getToken())
    let list 
    if (playlist) list = await getPlaylist(playlist, accessToken)
    if (album) list = await getAlbum(album, accessToken)
    setPageSongList(list)
    if (songList.songs.length === 0) addSongList(list)
    if (list?.type === 'album') setPitchforkReview(await getPitchfork({artist: list.albumArtist, album: list.albumName}))
  }

  function cardFunction (e) {
    setSong(e)
    sortPlaylists(pageSongList)
  }

  if (!pageSongList) return (<div className={styles['loading_state']}>Loading...</div>)

  return (
    <PageWrapper className={styles['playlist_page']}>
      <div className={styles['album_wrapper']}>
        <div className={styles['album_description']}>
          <h1>{pageSongList.albumArtist}</h1>
          <h2>{pageSongList.albumName}</h2>
          {pitchforkReview[0] && (
            <div className={styles['pitchfork_content']}>
              <p>{pitchforkReview[0].editorial.abstract} <a href={`https://pitchfork.com${pitchforkReview[0].url}`} target='_blank'>[full article]</a></p>
              <div className={classNames(styles['pitchfork_score'], styles[pitchforkReview[0].score >= 9 ? 'red' : 'black'])}>
                <span>{pitchforkReview[0].score}</span>
              </div>
            </div>
          )}
        </div>
        <div className={styles['art_cover']} style={{ backgroundImage: `url(${pageSongList.albumCover})` }} />
      </div>

      
      <div className={styles['card_grid']}>
        {pageSongList.type === 'playlist' && (
          pageSongList.songs.map((song, index) => 
            <MediaCard key={index} {...song} 
              onClick={e => cardFunction({...e, id: e.albumId})} 
              changeRoute={search => changeRoute(search)}
            />
          )
        )}
        {pageSongList.type === 'album' && (
          pageSongList.songs.map((song, index) => 
            <SearchCard key={index} {...song} 
              albumCover={pageSongList.albumCover} 
              album={pageSongList.albumName}
              onClick={e => cardFunction({...e, id: pageSongList.id})} 
              changeRoute={search => changeRoute(search)}
            />
          )
        )}
      </div>
    </PageWrapper>
  )
}

export default MusicPage