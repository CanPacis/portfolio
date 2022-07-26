import type { NextPage } from "next";
import { Group, ScrollArea } from "@mantine/core";
import { Bubbles } from "../components/Bubbles";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Showcase } from "../components/Showcase";
import { useMediaQuery } from "@mantine/hooks";
import { TABLET_SIZE } from "../store/responsiveStore";

const Home: NextPage = () => {
  const isTablet = useMediaQuery(TABLET_SIZE);

  return (
    <div>
      <Bubbles />
      <Group sx={(theme) => ({ gap: theme.spacing.lg })}>
        <ScrollArea
          sx={{ height: "100vh", overflowX: "hidden" }}
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
