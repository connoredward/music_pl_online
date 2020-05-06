import {useContext} from 'react'

import SearchForm from '~/components/layout/searchForm'
import PlayerBar from '~/components/layout/playerBar'

import MediaPlayer from '~/components/modules/mediaPlayer'

import {Context as SongContext} from '~/store/song'

const styles = {
  background: 'rgba(46,46,46,1)',
  minHeight: '100vh'
}

export function MediaWrapper({children, setPageUrl}) {
  const {currentSong} = useContext(SongContext)

  return (
    <div style={styles}>
      <SearchForm setPageUrl={url => setPageUrl(url)} />
      {children}
      <MediaPlayer {...currentSong} />
      <PlayerBar />
    </div>
  )
}

export default MediaWrapper