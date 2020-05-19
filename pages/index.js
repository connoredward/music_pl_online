import { useEffect, useState, useContext } from 'react'

import Head from 'next/head'
import Router, { useRouter } from 'next/router'

import MediaWrapper from '~/components/modules/mediaWrapper'
import HomePage from '~/components/pages/home'
import MusicPage from '~/components/pages/music'

import searchSpotify from '~/components/modules/spotifySearch'

import {Context as SongContext} from '~/store/song'
import {getToken} from '~/api/spotify'

export function Main({album, playlist, search}) {
  const router = useRouter()
  const [pageUrl, setPageUrl] = useState()

  const {addSearchList, changeAccessToken} = useContext(SongContext)

  useEffect(() => {
    onLoad()

    if (search) searchMusic(search)
    if (playlist || album) setPageUrl({playlist, album})

    Router.events.on('routeChangeComplete', (url) => {
      if (url === '/') {
        addSearchList([])
        setPageUrl('')
      }
      if (url.search('search') > 0) {
        searchMusic(url.split('=')[1])
        setPageUrl('')
      }
      if (url.search('album') > 0) {
        setPageUrl({album: url.split('=')[1]})
      }
      if (url.search('playlist') > 0) {
        setPageUrl({playlist: url.split('=')[1]})
      }
    })
  }, [playlist, album, search])

  async function onLoad() {
    changeAccessToken(await getToken())
  }

  function changeRoute({search, playlist, album}) {
    let href 
    if (search) href = `/?search=${search.replace(/ /g, '_')}`
    if (playlist) href = `/?playlist=${playlist}`
    if (album) href = `/?album=${album}`
    
    router.push(href, href, {shallow: true})

    setPageUrl({playlist, album})
  }

  function emptyRoute() {
    addSearchList([])
    router.push('/?', '/', {shallow: true})
    setPageUrl('')
  }

  async function searchMusic(search) {
    addSearchList(await searchSpotify(search.replace(/_/g, ' ')))
  }

  return (
    <MediaWrapper setPageUrl={link => changeRoute(link)} emptyRoute={() => emptyRoute()}>
      <Head><title>musci_pl</title></Head>
      {!pageUrl && (<HomePage changeRoute={link => changeRoute(link)} />)}
      {pageUrl && (<MusicPage slug={pageUrl} changeRoute={link => changeRoute(link)} />)}
    </MediaWrapper>
  )
}

Main.getInitialProps = async ({query}) => {
  return {
    search: query.search,
    playlist: query.playlist,
    album: query.album 
  }
}

export default Main