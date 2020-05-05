import { useEffect, useState } from 'react'

import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

import MediaWrapper from '~/components/modules/mediaWrapper'
import HomePage from '~/components/pages/home'

export function Main({listen}) {
  const router = useRouter()
  const [pageUrl, setPageUrl] = useState()

  useEffect(() => {
    Router.events.on('routerChangeComplete', (url) => {
      console.log('url', url)
    })
  }, [])

  function changeRoute(slug) {
    console.log('slug', slug)
  }

  return (
    <MediaWrapper setPageUrl={url => setPageUrl(url)}>
      <Head><title>musci_pl</title></Head>
      {!pageUrl && (
        <HomePage changeRoute={link => changeRoute(link)} />
      )}
    </MediaWrapper>
  )
}

Main.getInitialProps = async ({query}) => {
  return {listen: query.listen}
}

export default Main