import {useContext, useEffect, useState} from 'react'

import PageWrapper from '~/components/layout/pageWrapper'
import SearchCard from '~/components/layout/searchCard'
import AlbumCard from '~/components/layout/albumCard'
import MediaCard from '~/components/layout/mediaCard'

import {Context as SongContext} from '~/store/song'

import {getAllPlaylist, getToken, getPlaylist, sortTrack} from '~/api/spotify'
import {getWeekCharts} from '~/api/billboard'

import styles from './styles.scss'

export function HomePage({changeRoute}) {
  const {
    searchList, 
    accessToken, 
    changeAccessToken, 
    setSong, 
    addSongList
  } = useContext(SongContext)

  const [playlist, setPlaylist] = useState([])
  const [billboardSongs, setBillboardSongs] = useState([])

  useEffect(() => {
    if (accessToken) onLoad()
  }, [accessToken])

  async function onLoad() {
    if (new Date() - accessToken?.createdAt >= 3600000) changeAccessToken(await getToken())
    setPlaylist(await getAllPlaylist(accessToken))

    const e = await getWeekCharts(accessToken)
    setBillboardSongs(sortTrack(e))
  }

  async function playThis(id) {
    if (!accessToken || new Date() - accessToken?.createdAt >= 3600000) changeAccessToken(await getToken())
    console.log(123, accessToken)
    const e = await getPlaylist(id, accessToken)
    setSong(e.songs[0])
    addSongList(e)
  }

  return (
    <PageWrapper className={styles['home_page']}>

      <div className={styles['playlist_wrapper']}>
        <h2 className={styles.title}>My Playlists</h2>
        <div className={styles['cards_wrapper']}>
          {playlist.map((item, index) => 
            <AlbumCard {...item} key={index} 
              onClick={() => changeRoute({playlist: item.id})}
              playAlbum={id => playThis(id)}
            />
          )}
        </div>
      </div>


      
      <div className={styles['search_wrapper']}>
        {searchList.map((item, index) => 
          <SearchCard key={index} {...item} 
            onClick={vals => changeRoute({album: vals})} 
          />
        )}
      </div>

      {/* <h2>Recently added</h2> */}
      <h2 className={styles.title}>Top songs</h2>
      <div className={styles['search_wrapper']}>
        {billboardSongs.map((item, index) => 
          <MediaCard {...item} key={index}
            onClick={() => setSong(item)}
            changeRoute={search => changeRoute(search)}
          />
        )}
      </div>

      <div className={styles.content}>
        <p>made using the pitchfork, youtube and spotify api.</p>
      </div>
    </PageWrapper>
  )
}

export default HomePage