import { useEffect, useState } from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'

import fetch from 'isomorphic-unfetch'

export function Main({listen}) {
  const router = useRouter()
  const [pageUrl, setPageUrl] = useState()

  const [image, setImage] = useState()

  useEffect(() => {
    onLoad()
    Router.events.on('routerChangeComplete', (url) => {
      console.log('url', url)
    })
  }, [])

  function changeRoute(slug) {
    console.log('slug', slug)
  }

  async function onLoad() {
    const data = await fetch('/api/testing', {
      method: 'post',
      body: JSON.stringify('testing')
    })
      .then(response => response.json())

    setImage(data.images[0].url)
  }

  return (
    <div>
      <img src={image} />
    </div>
  )
}

Main.getInitialProps = async ({query}) => {
  return {listen: query.listen}
}

export default Main