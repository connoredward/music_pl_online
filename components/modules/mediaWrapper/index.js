import {useContext} from 'react'

import SearchForm from '~/components/layout/searchForm'
import PlayerBar from '~/components/layout/playerBar'

import MediaPlayer from '~/components/modules/mediaPlayer'

import {Context as SongContext} from '~/store/song'

import styles from './styles.scss'

export function MediaWrapper({children, setPageUrl}) {
  const {currentSong} = useContext(SongContext)

  return (
    <div className={styles.main}>
      <SearchForm setPageUrl={url => setPageUrl(url)} />
      {children}
      <MediaPlayer {...currentSong} />
      <PlayerBar />
    </div>
  )
}

export default MediaWrapper