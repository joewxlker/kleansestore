import { DocumentContext } from "next/dist/shared/lib/utils";
import Document, { Html, Main, NextScript, Head } from "next/document";
import Script from "next/script";
import { generateNonce } from "../utils/generateCsp";
import generateCSP from "../utils/generateCsp";

interface DocumentProps {
  nonce: string;
}

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const nonce: string = generateNonce();
    ctx.res?.setHeader("Content-Security-Policy", generateCSP({ nonce }));
    const initialProps = await Document.getInitialProps(ctx);
    const additionalProps = { nonce };
    return {
      ...initialProps,
      ...additionalProps,
    };
  }

  render(): JSX.Element {
    const { nonce } = this.props;
    return (
      <Html lang="en">
        <Head>
          <Script
            id={nonce}
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `window.__webpack_nonce__ = "${nonce}"`,
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
