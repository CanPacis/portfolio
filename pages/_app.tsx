import { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, MantineProvider } from "@mantine/core";
import { uiCache } from "../ui-cache";
import { RecoilRoot } from "recoil";
import { useMediaQuery } from "@mantine/hooks";
import { TABLET_SIZE } from "../store/responsiveStore";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const isTablet = useMediaQuery(TABLET_SIZE);

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
          <AppShell
            styles={(theme) => ({
              main: {
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                padding: 0,
                display: "flex",
                flexDirection: isTablet ? "column" : "row",
              },
            })}
          >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </RecoilRoot>
    </>
  );
}
