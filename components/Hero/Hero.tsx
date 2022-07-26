import { Group, Title, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRecoilValue } from "recoil";
import { TABLET_SIZE, MOBILE_SIZE } from "../../store/responsiveStore";
import { selectionStore } from "../../store/selectionStore";

export function Hero() {
  const selected = useRecoilValue(selectionStore);
  const isTablet = useMediaQuery(TABLET_SIZE);
  const isMobile = useMediaQuery(MOBILE_SIZE);

  return (
    <Group
      sx={(theme) => ({
        flex: 1,
        flexDirection: "column",
        alignItems: "start",
        padding: isTablet ? "4px 12px" : 0,
        gap: isMobile ? 0 : theme.spacing.lg,
      })}
    >
      <Group sx={{ position: "relative" }}>
        <Title
          data-capture-target="hero-title"
          data-non-drag-target
          order={1}
          p="xs"
          sx={(theme) => ({
            fontWeight: 400,
            fontSize: isMobile ? "2.6em" : "4em",
            fontFamily: "Comfortaa",
            color: theme.colors.blue[5],
            border: "2px solid",
            borderColor: selected.includes("hero-title") ? theme.fn.rgba(theme.colors.pink[5], 0.4) : "transparent",
            borderRadius: theme.radius.sm,
          })}
        >
          Hello There,
          <br />
          This is
          <br />
          Muhammed Ali.
        </Title>
        <Title
          order={1}
          p="xs"
          sx={(theme) => ({
            position: "absolute",
            top: isMobile ? -1 : -2,
            left: isMobile ? -1 : -3,
            color: theme.white,
            fontWeight: 400,
            fontSize: isMobile ? "2.6em" : "4em",
            fontFamily: "Comfortaa",
          })}
        >
          Hello There,
          <br />
          This is
          <br />
          Muhammed Ali.
        </Title>
      </Group>
      <Title
        data-capture-target="hero-subtitle"
        data-non-drag-target
        order={2}
        p="xs"
        sx={(theme) => ({
          fontWeight: 400,
          fontSize: "2em",
          color: theme.fn.rgba(theme.colors.blue[5], 0.4),
          border: "2px solid",
          borderColor: selected.includes("hero-subtitle") ? theme.fn.rgba(theme.colors.pink[5], 0.4) : "transparent",
          fontFamily: "Comfortaa",
          borderRadius: theme.radius.sm,
        })}
      >
        I build stuff with web technologies.
      </Title>
      <Text
        p="xs"
        data-capture-target="hero-description"
        data-non-drag-target
        sx={(theme) => ({
          border: "2px solid",
          borderColor: selected.includes("hero-description") ? theme.fn.rgba(theme.colors.pink[5], 0.4) : "transparent",
          borderRadius: theme.radius.sm,
        })}
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit.
      </Text>
    </Group>
  );
}
