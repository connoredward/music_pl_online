import {useContext, useEffect, useState} from 'react'

import PageWrapper from '~/components/layout/pageWrapper'
import SearchCard from '~/components/layout/searchCard'

import AlbumCard from '~/components/layout/albumCard'

import {Context as SongContext} from '~/store/song'

import {getAllPlaylist} from '~/api/spotify'

import styles from './styles.scss'

export function HomePage({changeRoute}) {
  const {searchList, accessToken} = useContext(SongContext)
  const [playlist, setPlaylist] = useState([])

  useEffect(() => {
    onLoad()
  }, [accessToken])

  async function onLoad() {
    if (accessToken) setPlaylist(await getAllPlaylist(accessToken))
  }

  return (
    <PageWrapper className={styles['home_page']}>

      <div className={styles['playlist_wrapper']}>
        <h2 className={styles.title}>My Playlists</h2>
        <div className={styles['cards_wrapper']}>
          {playlist.map((item, index) => 
            <AlbumCard {...item} key={index} 
              onClick={() => changeRoute({playlist: item.id})}
            />
          )}
        </div>
      </div>



      <div className={styles['search_wrapper']}>
        {searchList.map((item, index) => 
          <SearchCard 
            key={index} 
            {...item} 
            onClick={vals => changeRoute({album: vals})} 
          />
        )}
      </div>

      {/* <h2>Recently added</h2> */}

      <div className={styles.content}>
        <p>made using the pitchfork, youtube and spotify api.</p>
      </div>
    </PageWrapper>
  )
}

export default HomePage