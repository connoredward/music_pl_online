import {useContext} from 'react'

import {Context as SongContext} from '~/store/song'

import {Popover, Slider} from 'antd'
import {MdVolumeUp, MdVolumeOff, MdVolumeDown, MdVolumeMute} from 'react-icons/md'

export function SoundController() {
  const {isMute, muteSong, unMuteSong, changeVolume, volume} = useContext(SongContext)

  return (
    <div>
      <Popover 
        onClick={() => isMute ? unMuteSong() : muteSong()}
        placement="top" 
        content={
          <Slider 
            vertical 
            defaultValue={100} 
            style={{ height: 100 }} 
            onChange={e => changeVolume(e)} 
          />
        } 
        trigger="hover"
      >
        {!isMute && volume > 60 && (<MdVolumeUp />)}
        {!isMute && volume < 61 && volume > 20 && (<MdVolumeDown />)}
        {!isMute && volume < 21 && (<MdVolumeMute />)}
        {isMute && (<MdVolumeOff />)}
      </Popover>
    </div>
  )
}

export default SoundController