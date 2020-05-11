import {useState, useContext, useEffect} from 'react'

import {Slider} from 'antd'

import {Context as SongContext} from '~/store/song'

import styles from './styles.scss'

export function SongTimeline() {
  const {duration, mediaEvent} = useContext(SongContext)

  const [block, setBlock] = useState(undefined)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      if (mediaEvent) {
        setCurrentTime(Math.round(mediaEvent.getCurrentTime()))
      }
    }, 10)
    return () => clearInterval(id)
  }, [mediaEvent])

  function changeCurrentTime(time) {
    if (mediaEvent) {
      mediaEvent.seekTo(time)
    }
  }

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