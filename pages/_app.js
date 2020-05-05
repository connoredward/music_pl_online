import React from 'react'
import App, { Container } from 'next/app'

import { Store as SongStore } from '~/store/song'

class Base extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <SongStore>
        <Component {...pageProps} />
      </SongStore>
    )
  }
}

export default Base