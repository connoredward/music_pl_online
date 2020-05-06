// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"></meta>
          <link rel="apple-touch-icon" sizes="180x180" href="../static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="../static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="../static/favicon/favicon-16x16.png" />
          <link rel="manifest" href="../static/favicon/site.webmanifest"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}