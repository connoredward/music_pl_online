import {MdPlayArrow} from 'react-icons/md'

import styles from './styles.scss'

export default function AlbumCover (props) {
  const {albumCover, name, onClick, id, playAlbum} = props
  function playPlaylist(e) {
    e.stopPropagation()
    playAlbum(id)
  }
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles['album_cover']}>
        <MdPlayArrow onClick={e => playPlaylist(e)} />
        <img src={albumCover} />
      </div>
      <p>{name}</p>
    </div>
  )
}