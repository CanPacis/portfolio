import React from "react";
import { createStyles, Title, Text, Container, Group, Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Bubbles } from "../components/Bubbles";
import { useEnvironment } from "../hooks/useEnvironment";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 120,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][3],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,
    color: theme.white,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][1],
  },
}));

export default function Maintenance() {
  const { classes } = useStyles();
  const router = useRouter();
  const environment = useEnvironment();

  return (
    <div className={classes.root}>
      <Container>
        <Bubbles />
        <div className={classes.label}>Maintenance</div>
        <Title className={classes.title}>I&apos;m Working On It</Title>
        <Text size="lg" align="center" className={classes.description}>
          My personal website is currently under maintenance.
        </Text>
      </Container>
    </div>
  );
}
