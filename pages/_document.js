import { _gaId } from "consts";
import Document, { Html, Head, Main, NextScript } from "next/document";
const gtag = `https://www.googletagmanager.com/gtag/js?id=${_gaId}`;
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script async src={gtag} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${_gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
