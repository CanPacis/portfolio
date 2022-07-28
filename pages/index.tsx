import type { NextPage } from "next";
import { Group, Loader, ScrollArea } from "@mantine/core";
import { Bubbles } from "../components/Bubbles";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Showcase } from "../components/Showcase";
import { useMediaQuery } from "@mantine/hooks";
import { TABLET_SIZE } from "../store/responsiveStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const isTablet = useMediaQuery(TABLET_SIZE);
  const router = useRouter();
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

  useEffect(() => {
    if (isProduction && typeof window !== "undefined") {
      router.replace("/soon");
    }
  }, [router, isProduction]);

  if (isProduction) {
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
