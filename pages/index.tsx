import { AppShell, Group } from "@mantine/core";
import type { NextPage } from "next";
import { Bubbles } from "../components/Bubbles";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Showcase } from "../components/Showcase";

const Home: NextPage = () => {
  return (
    <div>
      <AppShell
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
            padding: 0,
          },
        })}
      >
        <Bubbles />
        <Group sx={(theme) => ({ gap: theme.spacing.lg })}>
          <Header />
          <Hero />
          <Showcase />
        </Group>
      </AppShell>
    </div>
  );
};

export default Home;
