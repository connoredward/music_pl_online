import {useContext, useEffect, useState} from 'react'

import fetch from 'isomorphic-unfetch'

import PageWrapper from '~/components/layout/pageWrapper'
import SearchCard from '~/components/layout/searchCard'

import AlbumCard from '~/components/layout/albumCard'

import {Context as SongContext} from '~/store/song'

import styles from './styles.scss'

export function HomePage({changeRoute}) {
  const {searchList} = useContext(SongContext)
  const [playlist, setPlaylist] = useState([])

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    const headers = {'Content-Type': 'application/json'}
    const response = await fetch('/api/playlists', {
      method: 'GET', 
      headers
    })
    const data = await response.json()
    setPlaylist(data.items.map(
      ({id, images, name, owner, type}) => 
        { return {
          id,
          name,
          type,
          owner: owner.display_name,
          albumCover: images[0].url
        }}
    ))
  }

  return (
    <PageWrapper className={styles['home_page']}>


      <div className={styles['playlist_wrapper']}>
        <h2 className={styles.title}>My Playlists</h2>
        <div className={styles['cards_wrapper']}>
          {playlist.map((item, index) => 
            <AlbumCard {...item} key={index} 
              onClick={() => changeRoute({listen: item.name})}
            />
          )}
        </div>
      </div>



      <div className={styles['search_wrapper']}>
        {searchList.map((item, index) => 
          <SearchCard 
            key={index} 
            {...item} 
            onClick={vals => changeRoute({listen: vals})} 
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