import {useState, useEffect, useContext} from 'react'

import classNames from 'classnames'

import PageWrapper from '~/components/layout/pageWrapper'
import MediaCard from '~/components/layout/mediaCard'
import SearchCard from '~/components/layout/searchMedia'

import {sortMusicList, getPitchfork} from '~api/spotify'

import {Context as SongContext} from '~/store/song'

import styles from './styles.scss'

export function MusicPage({slug}) {
  const {
    setSong,
    addSongList,
    songList,
    addPageSongList,
    pageSongList,
    sortPlaylists
  } = useContext(SongContext)

  const [pitchforkReview, setPitchforkReview] = useState({})

  useEffect(() => {
    onLoad()
    if (window) window.scrollTo(0,0)
  }, [slug])

  async function onLoad() {
    const e = await sortMusicList(slug)
    addPageSongList(e)
    if (songList.songs.length === 0) addSongList(e)

    if (e.type === 'album') {
      setPitchforkReview(await getPitchfork({artist: e.albumArtist, album: e.albumName}))
    }
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
            <MediaCard key={index} {...song} onClick={e => setSong({...e, id: pageSongList.id}) & sortPlaylists()} />
          )
        )}
        {pageSongList.type === 'album' && (
          pageSongList.songs.map((song, index) => 
            <SearchCard key={index} {...song} 
              albumCover={pageSongList.albumCover} 
              album={pageSongList.albumName}
              onClick={e => setSong({...e, id: pageSongList.id}) & sortPlaylists()} 
            />
          )
        )}
      </div>
    </PageWrapper>
  )
}

export default MusicPage