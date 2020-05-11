import React, { useState, useEffect } from 'react'

import MediaSearch from '~/components/modules/mediaSearch'

export const Context = React.createContext()

async function getAlbumCover(val) {
  return await new Promise(async(res, rej) => {
    const headers = {
      'Content-Type': 'application/json'
    }
    const response = await fetch('/getAlbum', {
      method: 'POST', 
      body: JSON.stringify({val}),
      headers
    })
    res(await response.json())
  })
}

export function Store ({ children }) {
  const [currentSong, setCurrentSong] = useState({})

  const [songList, setSongList] = useState([])
  const [pageSongList, setPageSongList] = useState([])
  const [searchList, setSearchList] = useState([])
  const [songQueue, setSongQueue] = useState([])

  const [isMute, setIsMute] = useState(false)
  const [volume, setVolume] = useState(100)

  const [isPause, setIsPause] = useState(true)
  const [mediaEvent, setMediaEvent] = useState()

  const [duration, setDuration] = useState(0)

  // useEffect(() => { 
  //   const id = setInterval(() => {
  //     if (mediaEvent) setCurrentTime(Math.round(mediaEvent.getCurrentTime()))
  //     if (mediaEvent) setVolume(Math.round(mediaEvent.getVolume()))
  //   }, 50)
  //   return () => clearInterval(id)
  // }, [mediaEvent])

  async function setSong (e) {
    const result = await MediaSearch(e)
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

  function sortPlaylists() {
    setSongList(pageSongList)
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

  async function prevSong() {
    let currentSongIndex
    if (!songList.tracks) currentSongIndex = songList.items.findIndex(({name}) => name === currentSong.media.song)
    else currentSongIndex = songList.tracks.items.findIndex(({track}) => track.name === currentSong.media.song)
    
    if (currentSongIndex === 0) setCurrentSong({}) & pauseSong()
    else {
      const artist = songList.items 
          ? songList.items[currentSongIndex - 1].artists[0].name
          : songList.tracks.items[currentSongIndex - 1].track.artists[0].name
      const song = songList.items
        ? songList.items[currentSongIndex - 1].name
        : songList.tracks.items[currentSongIndex - 1].track.name
  
      let album
      let imgPre

      if (songList.items) {
        const albumData = await getAlbumCover(songList.href.split('/')[5])
        album = albumData.name
        imgPre = albumData.images[0].url
      } 
      else {
        album = songList.tracks.items[currentSongIndex - 1].track.album.name
        imgPre = songList.tracks.items[currentSongIndex - 1].track.album.images[1].url
      }
      setSong({artist, song, album, imgPre})
    }
  }

  async function nextSong() {
    if (songQueue.length >= 1) {
      setSong(songQueue[0])
      songQueue.shift()
    } else {
      let currentSongIndex 
      if (!songList.tracks) currentSongIndex = songList.items.findIndex(({name}) => name === currentSong.media.song)
      else currentSongIndex = songList.tracks.items.findIndex(({track}) => track.name === currentSong.media.song)
      
      if (currentSongIndex + 1 === songList.length) setCurrentSong({}) & pauseSong()
      else {
        const artist = songList.items 
          ? songList.items[currentSongIndex + 1].artists[0].name
          : songList.tracks.items[currentSongIndex + 1].track.artists[0].name
        const song = songList.items
          ? songList.items[currentSongIndex + 1].name
          : songList.tracks.items[currentSongIndex + 1].track.name
    
        let album
        let imgPre

        if (songList.items) {
          const albumData = await getAlbumCover(songList.href.split('/')[5])
          album = albumData.name
          imgPre = albumData.images[0].url
        } 
        else {
          album = songList.tracks.items[currentSongIndex + 1].track.album.name
          imgPre = songList.tracks.items[currentSongIndex + 1].track.album.images[1].url
        }
        setSong({artist, song, album, imgPre})
      }
    }
  }

  function addSongList(songs) {
    setSongList(songs)
  }

  function addPageSongList(songs) {
    setPageSongList(songs)
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
      addPageSongList,
      pageSongList,

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