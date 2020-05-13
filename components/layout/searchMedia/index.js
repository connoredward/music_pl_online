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

export function SearchMedia(props) {
  const {song, artist, onClick, changeRoute} = props

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
        <p>{song} - {artist.map(({name}, index) => 
            artistNames(name, index, e => cardFunction(e, name))
          )}
        </p>
      </div>
      <QueueNotification {...props} />
    </div>
  )
}

export default SearchMedia