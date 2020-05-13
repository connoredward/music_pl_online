import React, {useState} from 'react'

import MediaSearch from '~/components/modules/mediaSearch'

export const Context = React.createContext()

export function Store ({ children }) {
  const [currentSong, setCurrentSong] = useState({})

  const [songList, setSongList] = useState({songs: []})

  const [searchList, setSearchList] = useState([])
  const [songQueue, setSongQueue] = useState([])

  const [isMute, setIsMute] = useState(false)
  const [volume, setVolume] = useState(100)

  const [isPause, setIsPause] = useState(true)
  const [mediaEvent, setMediaEvent] = useState()

  const [duration, setDuration] = useState(0)

  async function setSong (e) {
    console.log('e', e)
    const result = await MediaSearch(e)
    if (result.keyNum) {
      setSong(result)
    }
    setCurrentSong({media: e, searchedData: result[0]})
  }
  
  function muteSong() {
    mediaEvent.mute()
    setIsMute(true)
  }

  function unMuteSong() {
    mediaEvent.unMute()
    setIsMute(false)
  }

  function changeVolume(volume) {
    if (mediaEvent) mediaEvent.setVolume(volume)
  }
  
  function pauseSong() {
    mediaEvent.pauseVideo()
    setIsPause(true)
  }

  function sortPlaylists(list) {
    setSongList(list)
  }

  function playSong() {
    if (currentSong.media) mediaEvent.playVideo() & setIsPause(false)
    else if (songQueue.length >= 1) nextSong()
  }
  
  function setEvent(event) {
    setMediaEvent(event)
  } 
  
  function setPlay(event) {
    setDuration(mediaEvent.getDuration())
    playSong()
  }

  function prevSong() {
    if (mediaEvent.getCurrentTime() < 5) {
      const i = songList.songs.findIndex(({songId}) => songId === currentSong.media.songId)
      if (i === 0) {
        setCurrentSong({})
        pauseSong()
      } else {
        const newSong = songList.type === 'album' 
          ? {...songList.songs[i - 1], albumCover: songList.albumCover, album: songList.albumName, id:songList.id}
          : {...songList.songs[i - 1], id: songList.songs[i - 1].albumId}
        setSong(newSong)
      }
    } else {
      mediaEvent.seekTo(0)
    }
  }

  function nextSong() {
    if (songQueue.length >= 1) {
      setSong(songQueue[0])
      songQueue.shift()
    } else {
      const i = songList.songs.findIndex(({songId}) => songId === currentSong.media.songId)
      if (i + 1 === songList.songs.length) {
        setCurrentSong({})
        pauseSong()
      } else {
        const newSong = songList.type === 'album' 
          ? {...songList.songs[i + 1], albumCover: songList.albumCover, album: songList.albumName, id:songList.id}
          : {...songList.songs[i + 1], id: songList.songs[i + 1].albumId}
        setSong(newSong)
      }
    }
  }

  function addSongList(props) {
    setSongList(props)
  }

  function addSongQueue(song) {
    songQueue.push(song)
  }

  function removeSongQueue(index) {
    setSongQueue(song => song.filter((_, i) => i !== index))
  }

  function changeQueueOrder(queue) {
    setSongQueue(queue)
  }

  function addSearchList(songs) {
    setSearchList(songs)
  }

  return (
    <Context.Provider value={{ 
      currentSong,
      setSong,
      mediaEvent,

      isMute,
      muteSong,
      unMuteSong,
      changeVolume,
      volume,

      isPause,
      pauseSong,
      playSong,

      setEvent,
      setPlay,
      
      duration,

      prevSong,
      nextSong,

      addSongList,
      songList,

      addSongQueue,
      songQueue,
      removeSongQueue,
      changeQueueOrder,

      addSearchList,
      searchList,
      sortPlaylists
    }}>
      {children}
    </Context.Provider>
  )
}

export default {
  Store,
  Context
}