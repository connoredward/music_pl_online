import {useContext, useState} from 'react'

import {Context as SongContext} from '~/store/song'

import {Popover, Slider} from 'antd'
import {MdVolumeUp, MdVolumeOff, MdVolumeDown, MdVolumeMute} from 'react-icons/md'

import styles from './styles.scss'

export function SoundController() {
  const {isMute, muteSong, unMuteSong, changeVolume, volume} = useContext(SongContext)

  const [vol, setVol] = useState(100)

  function changeInVolume(e) {
    setVol(e)
    changeVolume(e)
  }

  return (
    <div>
      <Popover 
        onClick={() => isMute ? unMuteSong() : muteSong()}
        placement="top" 
        content={
          <Slider 
            vertical 
            defaultValue={100}
            value={vol}
            style={{ height: 100 }} 
            onChange={e => changeInVolume(e)} 
            className={styles['sound_slider']}
          />
        } 
        trigger="hover"
      >
        {!isMute && vol > 60 && (<MdVolumeUp />)}
        {!isMute && vol < 61 && vol > 20 && (<MdVolumeDown />)}
        {!isMute && vol < 21 && (<MdVolumeMute />)}
        {isMute && (<MdVolumeOff />)}
      </Popover>
    </div>
  )
}

export default SoundController