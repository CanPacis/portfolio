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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
