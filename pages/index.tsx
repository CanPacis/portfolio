import type { NextPage } from "next";
import { Group, Loader, ScrollArea } from "@mantine/core";
import { Bubbles } from "../components/Bubbles";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Showcase } from "../components/Showcase";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { TABLET_SIZE } from "../store/responsiveStore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { languageState } from "../store/content";
import { useMaintenance } from "../hooks/useEnvironment";

const Home: NextPage = () => {
  const isTablet = useMediaQuery(TABLET_SIZE);
  const maintenance = useMaintenance();
  const [language, setLanguage] = useRecoilState(languageState);
  const [localLanguage, setLocalLanguage] = useLocalStorage({ key: "language", defaultValue: language });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setLanguage(localLanguage);
    setIsReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  if (maintenance || !isReady) {
    return (
      <Group sx={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}>
        <Loader variant="bars" />
      </Group>
    );
  }

  return (
    <div>
      <Bubbles />
      <Group sx={(theme) => ({ gap: theme.spacing.lg, height: "100%" })}>
        <ScrollArea
          sx={{ height: "calc(100vh - var(--footer-height))", overflowX: "hidden" }}
          styles={{
            viewport: {
              "& > div": {
                display: "flex !important",
                alignItems: "center",
                flexDirection: isTablet ? "column" : "row",
              },
            },
          }}
        >
          <Header />
          <Hero />
          <Showcase />
        </ScrollArea>
      </Group>
    </div>
  );
};

export default Home;
