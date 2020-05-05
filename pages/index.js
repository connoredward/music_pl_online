import { useEffect, useState } from 'react'

import Head from 'next/head'
import Router, { useRouter } from 'next/router'

import MediaWrapper from '~/components/modules/mediaWrapper'
import HomePage from '~/components/pages/home'
import MusicPage from '~/components/pages/music'

export function Main({listen}) {
  const router = useRouter()
  const [pageUrl, setPageUrl] = useState()

  useEffect(() => {
    setPageUrl(listen)
    Router.events.on('routeChangeComplete', (url) => {
      setPageUrl(url.split('=')[1])
    })
  }, [listen])

  function changeRoute(slug) {
    const href = `/?listen=${slug}`
    router.push(href, href, {shallow: true})
    setPageUrl(slug)
  }

  return (
    <MediaWrapper setPageUrl={url => setPageUrl(url)}>
      <Head><title>musci_pl</title></Head>
      {!pageUrl && (
        <HomePage changeRoute={link => changeRoute(link)} />
      )}
      {pageUrl && (
        <MusicPage slug={pageUrl} changeRoute={link => changeRoute(link)} />
      )}
    </MediaWrapper>
  )
}

Main.getInitialProps = async ({query}) => {
  return {listen: query.listen}
}

export default Main