import {useState, useContext} from 'react'

import {Slider, DatePicker} from 'antd'

import {Context as SongContext} from '~/store/song'

import styles from './styles.scss'

export function SongTimeline() {
  const {duration, currentTime, changeCurrentTime} = useContext(SongContext)
  const [block, setBlock] = useState(undefined)

  function songTime(time) {
    const timeRound = Math.round(time)
    const minute = Math.floor(timeRound/60)
    const seconds = timeRound - minute * 60
    return (<>{minute} : {seconds < 10 ? `0${seconds}` : seconds}</>)
  }

  return (
    <div className={styles['song_timeline']}>
      <span>{songTime(currentTime)}</span>
      <Slider 
        value={block ? block : currentTime} 
        max={duration}
        tooltipVisible={false} 
        onChange={e => setBlock(e)} 
        onAfterChange={e => changeCurrentTime(e) & setBlock(undefined)}
        className={styles['song_slider']}
      />
      <span>{songTime(duration)}</span>
    </div>
  )
}

export default SongTimeline