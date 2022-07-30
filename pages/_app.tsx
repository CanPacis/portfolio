import "../styles/global.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, MantineProvider } from "@mantine/core";
import { Footer } from "../components/Footer";
import { uiCache } from "../ui-cache";
import { RecoilRoot } from "recoil";
import { useMediaQuery } from "@mantine/hooks";
import { TABLET_SIZE } from "../store/responsiveStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMaintenance } from "../hooks/useEnvironment";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const maintenance = useMaintenance();
  const isTablet = useMediaQuery(TABLET_SIZE);

  useEffect(() => {
    if (maintenance && typeof window !== "undefined" && router.pathname !== "/maintenance") {
      router.replace("/maintenance");
    }
  }, [router, maintenance]);

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
                "#83838B",
                "#1D1E2C",
                "#4A4B56",
                "#282937",
                "#282937",
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
            footer={<Footer />}
            styles={(theme) => ({
              main: {
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                padding: 0,
                display: "flex",
                flexDirection: isTablet ? "column" : "row",
                height: "calc(100vh - var(--footer-height))",
                minHeight: "calc(100vh - var(--footer-height))",
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
