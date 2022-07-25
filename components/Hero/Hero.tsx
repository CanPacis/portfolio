import { Group, Title, Text } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { selectionStore } from "../../store/selectionStore";

export function Hero() {
  const selected = useRecoilValue(selectionStore);

  console.log(selected)

  return (
    <Group sx={{ flex: 1, flexDirection: "column", alignItems: "start" }}>
      <Title
        data-capture-target="hero-title"
        order={1}
        p="xs"
        sx={(theme) => ({
          position: "relative",
          fontWeight: 400,
          fontSize: 67,
          fontFamily: "Comfortaa",
          color: theme.colors.blue[5],
          border: "2px solid",
          borderColor: selected.includes("hero-title") ? "rgba(255, 255, 255, .4)" : "transparent",
          borderRadius: theme.radius.sm,
        })}
      >
        Hello There,
        <br />
        This is
        <br />
        Muhammed Ali.
        <Title
          order={1}
          p="xs"
          sx={(theme) => ({
            position: "absolute",
            top: -2,
            left: -6,
            color: theme.white,
            fontWeight: 400,
            fontSize: 67,
            fontFamily: "Comfortaa",
          })}
        >
          Hello There,
          <br />
          This is
          <br />
          Muhammed Ali.
        </Title>
      </Title>
      <Title
        order={2}
        sx={(theme) => ({
          fontWeight: 400,
          fontSize: 40,
          color: theme.fn.rgba(theme.colors.blue[5], 0.4),
          fontFamily: "Comfortaa",
        })}
      >
        I build stuff with web technologies.
      </Title>
      <Text>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit.
      </Text>
    </Group>
  );
}
