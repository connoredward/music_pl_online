import {useState, useEffect, useContext} from 'react'

import classNames from 'classnames'

import {Context as SongContext} from '~/store/song'
import QueueNotification from '~/components/layout/queueNotification'

import styles from './styles.scss'

export function MediaCard(props) {
  const {
    song,
    artist,
    id,
    onClick,
    imgPre = '',
    album = ''
  } = props

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
      <QueueNotification song={song} artist={artist} imgPre={imgPre} album={album} />
      <div className={styles['art_cover']} style={{ backgroundImage: `url(${imgPre})` }} />
    </div>
  )
}

export default MediaCard