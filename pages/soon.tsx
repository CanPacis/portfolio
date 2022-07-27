import { createStyles, Title, Text, Button, Container, Group } from "@mantine/core";
import { Bubbles } from "../components/Bubbles";

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
    fontSize: 220,
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

export default function Soon() {
  const { classes } = useStyles();

  console.log(process.env.NEXT_PUBLIC_VERCEL_ENV)

  return (
    <div className={classes.root}>
      <Container>
        <Bubbles />
        <div className={classes.label}>Soon</div>
        <Title className={classes.title}>Coming Soon</Title>
        <Text size="lg" align="center" className={classes.description}>
          My personal website is currently under construction.
        </Text>
      </Container>
    </div>
  );
}
