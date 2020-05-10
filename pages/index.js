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
    if (search) searchMusic(search)
    if (listen) setPageUrl(listen)

    Router.events.on('routeChangeComplete', (url) => {
      if (url === '/') {
        addSearchList([])
        setPageUrl('')
      }
      if (url.search('search') > 0) {
        searchMusic(url.split('=')[1])
        setPageUrl('')
      }
      if (url.search('listen') > 0) setPageUrl(url.split('=')[1])
    })
  }, [listen, search])

  function changeRoute({search, listen}) {
    console.log(search, listen)
    const href = search ? `/?search=${search.replace(/ /g, '_')}` : `/?listen=${listen}`
    router.push(href, href, {shallow: true})
    setPageUrl(listen)
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
  return {listen: query.listen, search: query.search}
}

export default Main