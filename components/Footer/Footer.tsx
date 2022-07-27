import { createStyles, Container, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  footer: {
    height: 60,
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
  },

  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text size="sm" color="dimmed">Muhammed Ali CAN - 2022</Text>
      </Container>
    </div>
  );
}
