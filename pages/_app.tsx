import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { uiCache } from "../ui-cache";
import { RecoilRoot } from "recoil";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Muhammed Ali CAN - Portfolio</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/profile-picture.png" type="image/png" />
      </Head>

      <RecoilRoot>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          emotionCache={uiCache}
          theme={{
            colors: {
              dark: [
                "#F4FFFD",
                "#F4FFFD",
                "#6C6D76",
                "#1D1E2C",
                "#343441",
                "#282937",
                "#1D1E2C",
                "#2F3043",
                "#1D1E2C",
                "#1D1E2C",
              ],
            },
            colorScheme: "dark",
            fontFamily: "Comfortaa",
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </RecoilRoot>
    </>
  );
}
