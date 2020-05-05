import {useContext, useEffect, useState} from 'react'

import fetch from 'isomorphic-unfetch'

import {Context as SongContext} from '~/store/song'

import PageWrapper from '~/components/layout/pageWrapper'
import SearchCard from '~/components/layout/searchCard'

import styles from './styles.scss'

export function HomePage({changeRoute}) {
  const {searchList} = useContext(SongContext)
  const [playlist, setPlaylist] = useState([])

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    
  }
  
  return (
    <PageWrapper className={styles['home_page']}>
      <div className={styles['playlist_wrapper']}>
        <h2 className={styles.title}>My Playlists</h2>
        {playlist.map(({name, owner, images, id}) => 
          <SearchCard 
            album={name} 
            artist={owner.display_name} 
            imgPre={images[1].url} id={id} 
            onClick={() => changeRoute(name.split('_')[2])}
          />
        )}
      </div>

      <div className={styles['search_wrapper']}>
        {searchList.map((item) => <SearchCard {...item} onClick={vals => changeRoute(vals)} />)}
      </div>

      {/* <h2>Recently added</h2> */}

      <div className={styles.content}>
        <p>made using the pitchfork, youtube and spotify api.</p>
      </div>
    </PageWrapper>
  )
}

export default HomePage