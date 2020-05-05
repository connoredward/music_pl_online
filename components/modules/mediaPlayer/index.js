import { useState, useEffect, useContext } from 'react'
import YouTube from 'react-youtube'

import { Context as SongContext } from '~/store/song'

const opts = {
  height: '0',
  width: '0',
  playerVars: {autoplay: 1}
}

export function MediaPlayer({searchedData}) {
  const [videoId, setVideoId] = useState()
  const {setEvent, setPlay, nextSong} = useContext(SongContext)
  
  useEffect(() => {
    if (searchedData && searchedData.id) setVideoId(searchedData.id)
  }, [searchedData])
  
  return (
    <YouTube 
      videoId={videoId}
      opts={opts}
      onReady={event => setEvent(event.target)}
      onStateChange={event => setEvent(event.target)}
      onPlay={event => setPlay(event)}
      onEnd={() => nextSong()}
    />
  )
}

export default MediaPlayer