import { Bubbles } from "../components/Bubbles";
import { createStyles, Container, Title, Text, Button, Group } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { selectionStore } from "../store/selectionStore";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  inner: {
    position: "relative",
  },

  image: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.75,
  },

  content: {
    position: "relative",
    zIndex: 1,

    [theme.fn.smallerThan("sm")]: {
      paddingTop: 120,
    },
  },

  title: {
    fontFamily: `${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function FourOhFour() {
  const selected = useRecoilValue(selectionStore);
  const { classes } = useStyles();

  return (
    <>
      <Bubbles />
      <Container className={classes.root}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title
              sx={(theme) => ({
                border: "2px solid",
                borderColor: selected.includes("p-404-title")
                  ? theme.fn.rgba(theme.colors.pink[5], 0.4)
                  : "transparent",
                borderRadius: theme.radius.sm,
              })}
              p="sm"
              data-capture-target="p-404-title"
              data-non-drag-target
              className={classes.title}
            >
              Nothing to see here
            </Title>
            <Text
              sx={(theme) => ({
                border: "2px solid",
                borderColor: selected.includes("p-404-description")
                  ? theme.fn.rgba(theme.colors.pink[5], 0.4)
                  : "transparent",
                borderRadius: theme.radius.sm,
              })}
              p="sm"
              data-capture-target="p-404-description"
              data-non-drag-target
              color="dimmed"
              size="lg"
              align="center"
              className={classes.description}
            >
              Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved
              to another URL. If you think this is an error contact support.
            </Text>
            <Group position="center">
              <Link passHref href="/">
                <Button component="a" data-non-drag-target size="md">
                  Take me back to home page
                </Button>
              </Link>
            </Group>
          </div>
        </div>
      </Container>
    </>
  );
}
