import {useState, useEffect, useContext} from 'react'

import classNames from 'classnames'

import {Context as SongContext} from '~/store/song'
import QueueNotification from '~/components/layout/queueNotification'

import styles from './styles.scss'

export function SearchMedia(props) {
  const {song, artist, onClick} = props

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
      <QueueNotification {...props} />
    </div>
  )
}

export default SearchMedia