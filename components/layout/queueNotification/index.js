import {useContext} from 'react'

import { notification } from 'antd'
import { MdAddToQueue } from 'react-icons/md'

import {Context as SongContext} from '~/store/song'

import styles from './styles.scss'

const queueNotification = ({song, artist}) => {
  const args = {
    message: 'Song added to queue',
    description: `${song} - ${artist} has been added to the queue`,
    duration: 1
  }
  notification.open(args)
}

export function QueueNotification(props) {
  const {addSongQueue} = useContext(SongContext)

  return (
    <button>
      <MdAddToQueue onClick={e => 
        e.stopPropagation() &
        addSongQueue(props) &
        queueNotification(props)
      } />
    </button>
  )
}

export default QueueNotification