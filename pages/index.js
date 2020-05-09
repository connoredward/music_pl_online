import { useEffect, useState, useContext } from 'react'

import Head from 'next/head'
import Router, { useRouter } from 'next/router'

import MediaWrapper from '~/components/modules/mediaWrapper'
import HomePage from '~/components/pages/home'
import MusicPage from '~/components/pages/music'

import searchSpotify from '~/components/modules/spotifySearch'
import {Context as SongContext} from '~/store/song'

export function Main({listen, search}) {
  const router = useRouter()
  const [pageUrl, setPageUrl] = useState()

  const {addSearchList} = useContext(SongContext)

  useEffect(() => {
    setPageUrl(listen)
    if (search) searchMusic(search)
    Router.events.on('routeChangeComplete', (url) => {
      setPageUrl(url.split('=')[1])
    })
  }, [listen])

  function changeRoute(slug) {
    const href = `/?listen=${slug}`
    router.push(href, href, {shallow: true})
    setPageUrl(slug)
  }

  function emptyRoute(url) {
    router.push('/?', '/', {shallow: true})
    setPageUrl('')
  }

  async function searchMusic(search) {
    addSearchList(await searchSpotify(search.replace(/_/g, ' ')))
  }

  return (
    <MediaWrapper setPageUrl={() => emptyRoute()}>
      <Head><title>musci_pl</title></Head>
      {!pageUrl && (<HomePage changeRoute={link => changeRoute(link)} />)}
      {pageUrl && (<MusicPage slug={pageUrl} changeRoute={link => changeRoute(link)} />)}
    </MediaWrapper>
  )
}

Main.getInitialProps = async ({query}) => {
  return {listen: query.listen, search: query.search}
}

export default Main