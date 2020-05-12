import {useState, useEffect, useContext} from 'react'

import classNames from 'classnames'

import {Context as SongContext} from '~/store/song'
import QueueNotification from '~/components/layout/queueNotification'

import styles from './styles.scss'

export function SearchMedia(props) {
  const {song, songId, artist, onClick, albumCover, album} = props

  const {currentSong} = useContext(SongContext)
  const {media} = currentSong

  return (
    <div 
      className={classNames(styles['card_wrapper'], styles[media?.song === song ? 'active' : null])} 
      onClick={() => onClick(props)}
    >
      <div className={styles['credentials_wrapper']}>
        <p>{song} - <span>{artist}</span></p>
      </div>
      <QueueNotification song={song} artist={artist} imgPre={albumCover} album={album} />
    </div>
  )
}

export default SearchMedia