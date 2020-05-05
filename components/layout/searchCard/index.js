import {useState, useEffect} from 'react'

import styles from './styles.scss'

export function SearchCard({album, artist, imgPre, id, onClick}) {
  const [currentMedia, setCurrentMedia] = useState()

  useEffect(() => {
    if (album) setCurrentMedia({artist, album, imgPre})
  }, [album])

  if (!currentMedia) return (<div>Loading...</div>)
  return (
    <div className={styles['card_wrapper']} onClick={() => onClick(id)}>
      <div className={styles['album_content']}>
        <h1>{album}</h1>
        <h2>{artist}</h2>
      </div>
      <div className={styles['art_cover']} style={{ backgroundImage: `url(${imgPre})` }} />
    </div>
  )
}

export default SearchCard