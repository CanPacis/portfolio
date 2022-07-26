import { Avatar, Divider, Group, ActionIcon, Tooltip } from "@mantine/core";
import classes from "../../styles/Header.module.css";
import { useRecoilValue } from "recoil";
import { selectionStore } from "../../store/selectionStore";
import { useMediaQuery } from "@mantine/hooks";
import { TABLET_SIZE, MOBILE_SIZE } from "../../store/responsiveStore";
import { useContent } from "../../hooks/useContent";

export function Header() {
  const selected = useRecoilValue(selectionStore);
  const isTablet = useMediaQuery(TABLET_SIZE);
  const isMobile = useMediaQuery(MOBILE_SIZE);
  const content = useContent();

  return (
    <header className={!isTablet ? classes.headerDesktop : classes.headerMobile}>
      <Group>
        <Avatar
          radius={60}
          size={60}
          src="/profile-picture.png"
          alt="Profile picture"
          data-capture-target="profile-picture"
          sx={(theme) => ({
            border: "3px solid",
            borderColor: selected.includes("profile-picture") ? theme.colors.blue[5] : "transparent",
          })}
        />
      </Group>
      <Divider
        size="sm"
        color="blue"
        orientation={isTablet ? "horizontal" : "vertical"}
        sx={{ margin: "auto", opacity: 0.4, flex: 1 }}
      />
      <Group
        sx={(theme) => ({
          flexDirection: isTablet ? "row" : "column",
          gap: isMobile ? theme.spacing.xs : theme.spacing.md,
        })}
      >
        {content.contactList.map((link) => (
          <span key={link.url} data-capture-target={link.label} data-non-drag-target>
            <Tooltip label={link.label} position={isMobile ? "bottom" : "left"}>
              <ActionIcon
                target="_blank"
                href={link.url}
                color="blue"
                variant={selected.includes(link.label) ? "filled" : "light"}
                component="a"
              >
                {link.icon}
              </ActionIcon>
            </Tooltip>
          </span>
        ))}
      </Group>
      {!isMobile && (
        <Divider
          size="sm"
          color="blue"
          orientation={isTablet ? "horizontal" : "vertical"}
          sx={{ margin: "auto", opacity: 0.4, [isTablet ? "width" : "height"]: 60 }}
        />
      )}
    </header>
  );
}
