import {useState, useEffect, useContext} from 'react'

import classNames from 'classnames'

import {Context as SongContext} from '~/store/song'
import QueueNotification from '~/components/layout/queueNotification'

import styles from './styles.scss'

export function MediaCard(props) {
  const {currentSong} = useContext(SongContext)
  const {media} = currentSong

  const [currentMedia, setCurrentMedia] = useState()

  const {
    song = props.track.name,
    artist = props.track.artists[0].name,
    album = props.track.album.name,
    imgPre = props.track.album.images[1].url,
    onClick
  } = props

  useEffect(() => {
    if (song) setCurrentMedia({song, artist, album, imgPre})
  }, [song])

  return (
    <div 
      className={classNames(styles['card_wrapper'], styles[media && media.song === song ? 'active' : null])}
      onClick={() => onClick(currentMedia)}
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