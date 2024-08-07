/* eslint-disable @next/next/next-script-for-ga */
import { _gaId, _gtmId } from 'consts';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Google Tag Manager */}
          <script dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${_gtmId}');`,
          }} />
          {/* Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${_gaId}`}></script>
          <script dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${_gaId}');`,
          }} />
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${_gtmId}`}
          height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

