import { useEffect, useState } from 'react'

import fetch from 'isomorphic-unfetch'

export function Main() {
  const [image, setImage] = useState()

  useEffect(() => {
    onLoad()
  }, [])

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

export default Main