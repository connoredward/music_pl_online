import React from 'react'
import App, { Container } from 'next/app'

import { Store as SongStore } from '~/store/song'

import './global.scss'
import 'antd/dist/antd.css'

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