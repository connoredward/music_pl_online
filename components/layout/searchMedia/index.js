import {useState, useEffect, useContext} from 'react'

import classNames from 'classnames'

import {Context as SongContext} from '~/store/song'
import QueueNotification from '~/components/layout/queueNotification'

import styles from './styles.scss'

export function SearchMedia(props) {
  const {currentSong} = useContext(SongContext)
  const [currentMedia, setCurrentMedia] = useState()
  const {
    song = props.name,
    artist = props.artists[0].name,
    imgPre = props.imgPre,
    album,
    onClick
  } = props

  useEffect(() => {
    if (song) setCurrentMedia({song, artist})
  },[song])

  return (
    <div 
      className={classNames(styles['card_wrapper'], styles[currentSong.media && currentSong.media.song === song ? 'active' : null])} 
      onClick={() => onClick(currentMedia)}
    >
      <div className={styles['credentials_wrapper']}>
        <p>{song} - <span>{artist}</span></p>
      </div>
      <QueueNotification song={song} artist={artist} imgPre={imgPre} album={album} />
    </div>
  )
}