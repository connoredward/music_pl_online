import {useState, useEffect, useContext} from 'react'

import classNames from 'classnames'

import {Context as SongContext} from '~/store/song'
import QueueNotification from '~/components/layout/queueNotification'

import styles from './styles.scss'

export function MediaCard(props) {
  const {album, albumCover, albumId, artist, artistId, onClick, song, songId} = props

  const {currentSong} = useContext(SongContext)
  const {media} = currentSong

  return (
    <div 
      className={classNames(styles['card_wrapper'], styles[media?.song === song ? 'active' : null])}
      onClick={() => onClick(props)}
    >
      <div className={styles['credentials_wrapper']}>
        <p>{song}</p>
        <span>{artist} - <span>{album}</span></span>
      </div>
      <QueueNotification {...props} />
      <div className={styles['art_cover']} style={{ backgroundImage: `url(${albumCover})` }} />
    </div>
  )
}

export default MediaCard