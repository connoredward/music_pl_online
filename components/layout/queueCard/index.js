import {useContext} from 'react'

import {Popover} from 'antd'
import {MdMoreHoriz, MdCancel, MdInbox} from 'react-icons/md'
import DragSortableList from 'react-drag-sortable'

import {Context as SongContext} from '~/store/song'

import styles from './styles.scss'

function MediaCard({song, album, artist, albumCover, onClick}) {
  return (
    <div className={styles['queue_card']}>
      <div className={styles['queue_content']}>
        <p className={styles.song}>{song}</p>
        <p>{artist} - {album}</p>
      </div>
      <div className={styles['art_cover']} style={{ backgroundImage: `url(${albumCover})` }} />
      <button onClick={() => onClick()}><MdCancel /></button>
    </div>
  )
}

function CardContent({songQueue, onSort, removeSong}) {
  return (
    <div className={styles['queue_card_wrapper']}>
      {songQueue.length < 1 && (
        <div className={styles['empty_message']}>
          <MdInbox />
          <h1>Empty</h1>
        </div>
      )} 

      <DragSortableList 
        items={songQueue.map((item, index) => { return {content: (<MediaCard key={index} {...item} onClick={() => removeSong(index)} />)}})} 
        onSort={onSort} 
        dropBackTransitionDuration={0.3} 
        type='vertical'
      />
    </div>
  )
}

export function QueueCard() {
  const {songQueue, removeSongQueue, changeQueueOrder} = useContext(SongContext)

  const onSort = (sortedList) => {
    changeQueueOrder(sortedList.map(({content}) => {return content.props}))
  }
  
  function removeSong(index) {
    removeSongQueue(index)
  }

  return (
    <Popover
      className={styles['queue_popover_wrapper']}
      content={
        <CardContent 
          songQueue={songQueue} 
          onSort={sortedList => onSort(sortedList)} 
          removeSong={index => removeSong(index)} 
        />
      } 
      placement='topRight'
      trigger='click'
    >
      <MdMoreHoriz />
    </Popover>
  )
}

export default QueueCard