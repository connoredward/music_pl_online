import {useState, useEffect, useContext} from 'react'

import classNames from 'classnames'

import {Context as SongContext} from '~/store/song'
import QueueNotification from '~/components/layout/queueNotification'

import styles from './styles.scss'

const artistNames = (name, index, onClick) => {
  return <span key={index} onClick={onClick}>
    {index === 0 ? '' : ' & '}
    <span className={styles.name}>{name}</span>
  </span>
}

export function MediaCard(props) {
  const {album, albumCover, artist, onClick, song, changeRoute} = props

  const {currentSong} = useContext(SongContext)
  const {media} = currentSong

  function cardFunction(e, name) {
    e.stopPropagation()
    changeRoute({search: name})
  }

  return (
    <div 
      className={classNames(styles['card_wrapper'], styles[media?.song === song ? 'active' : null])}
      onClick={() => onClick(props)}
    >
      <div className={styles['credentials_wrapper']}>
        <p>{song}</p>
        <span>
          {artist.map(({name}, index) => artistNames(name, index, e => cardFunction(e, name)))} 
          - <span>{album}</span>
        </span>
      </div>
      <QueueNotification {...props} />
      <div className={styles['art_cover']} style={{ backgroundImage: `url(${albumCover})` }} />
    </div>
  )
}

export default MediaCard