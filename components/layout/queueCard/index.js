import {useContext} from 'react'

import {Popover} from 'antd'
import {MdMoreHoriz, MdCancel, MdInbox} from 'react-icons/md'

import {Context as SongContext} from '~/store/song'

import styles from './styles.scss'

function MediaCard({song, album, artist, imgPre, onClick}) {
  return (
    <div className={styles['queue_card']}>
      <div className={styles['queue_content']}>
        <p className={styles['song']}>{song}</p>
        <p>{artist} - {album}</p>
      </div>
      <div className={styles['art_cover']} style={{ backgroundImage: `url(${imgPre})` }} />
      <button onClick={() => onClick()}><MdCancel /></button>
    </div>
  )
}

function CardContent() {
  const {songQueue, removeSongQueue} = useContext(SongContext)
  return (
    <div className={styles['queue_card_wrapper']}>
      {songQueue.length < 1 && (<div className={styles['empty_message']}>
        <MdInbox />
        <h1>Empty</h1>
      </div>)} 
      {songQueue.map((item, index) => <MediaCard key={index} {...item} onClick={() => removeSongQueue(index)} />)}
    </div>
  )
}

export function QueueCard() {
  return (
    <Popover
      className={styles['queue_popover_wrapper']}
      content={<CardContent />} 
      placement='topRight'
      trigger='click'
    >
      <MdMoreHoriz />
    </Popover>
  )
}

export default QueueCard