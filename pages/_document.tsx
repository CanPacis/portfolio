// _document.tsx
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { ServerStyles, createStylesServer } from "@mantine/next";
import { uiCache } from "../ui-cache";

const stylesServer = createStylesServer(uiCache);

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [initialProps.styles, <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap"
            rel="stylesheet"
          ></link>

          {/* <!-- Primary Meta Tags --> */}
          <meta name="title" content="Muhammed Ali CAN - Portfolio" />
          <meta
            name="description"
            content="Hello There, this is Muhammed Ali and I build stuff with web technologies. "
          />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.canpacis.net/" />
          <meta property="og:title" content="Muhammed Ali CAN - Portfolio" />
          <meta
            property="og:description"
            content="Hello There, this is Muhammed Ali and I build stuff with web technologies. "
          />
          <meta property="og:image" content="/profile-picture.png" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://www.canpacis.net/" />
          <meta property="twitter:title" content="Muhammed Ali CAN - Portfolio" />
          <meta
            property="twitter:description"
            content="Hello There, this is Muhammed Ali and I build stuff with web technologies. "
          />
          <meta property="twitter:image" content="/profile-picture.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
