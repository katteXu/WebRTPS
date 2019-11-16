import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html style={{ margin: 0, padding: 0 }}>
        <title>摄像头监控项目</title>
        <Head></Head>
        <body style={{ margin: 0, padding: 0 }}>
          <Main />
          <NextScript />
        </body>
        <script src="../static/jsmpeg.min.js"></script>
      </html>
    )
  }
}