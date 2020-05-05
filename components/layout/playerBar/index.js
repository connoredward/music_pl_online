import {useContext} from 'react'

import QueueCard from '~/components/layout/queueCard'
import SongTimeline from '~/components/layout/songTimeline'
import SoundController from '~/components/layout/soundController'

import {Context as SongContext} from '~/store/song'

import {
  MdPauseCircleOutline, 
  MdPlayCircleOutline, 
  MdSkipNext, 
  MdSkipPrevious,
} from 'react-icons/md'

import styles from './styles.scss'

export function PlayerBar() {
  const {
    isPause,
    pauseSong,
    playSong,
    currentSong,
    prevSong,
    nextSong
  } = useContext(SongContext)

  return (
    <div className={styles['player_bar']}>
      <div className={styles['controller_button_wrapper']}>
        <div className={styles['current_song']}>
          {currentSong.media && (
            <div>
              <div className={styles['art_cover']} style={{ background: `url(${currentSong.media.imgPre})` }} />
              <div className={styles['song_information']}>
                <p>{currentSong.media.song}</p>
                <p className={styles['artist_name']}>{currentSong.media.artist}</p>
              </div>
            </div>
          )}
        </div>
        <div className={styles['controller_wrapper']}>
          <div className={styles['controller_buttons']}>
            <MdSkipPrevious onClick={() => prevSong()} />
            {isPause
              ? <MdPlayCircleOutline onClick={() => playSong()} />
              : <MdPauseCircleOutline onClick={() => pauseSong()} />
            }
            <MdSkipNext onClick={() => nextSong()} />
          </div>
          <SongTimeline />
        </div>

        <div className={styles['other_controls']}>
          <SoundController />
          <QueueCard />
        </div>

      </div>
    </div>  
  )
}

export default PlayerBar