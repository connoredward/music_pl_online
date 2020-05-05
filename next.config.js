const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withImages = require('next-images')
const withFonts = require('next-fonts')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([
  [withCss],
  [withLess],
  [withSass, {
    cssModules: true
  }],
  [withImages],
  [withFonts]
])