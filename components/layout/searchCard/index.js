import {useState, useEffect} from 'react'

import styles from './styles.scss'

export function SearchCard({album, artist, albumCover, id, onClick}) {
  return (
    <div className={styles['card_wrapper']} onClick={() => onClick(id)}>
      <div className={styles['album_content']}>
        <h1>{album}</h1>
        <h2>{artist}</h2>
      </div>
      <div className={styles['art_cover']} style={{ backgroundImage: `url(${albumCover})` }} />
    </div>
  )
}

export default SearchCard