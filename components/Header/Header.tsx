import { BrandLinkedin, BrandGithub, BrandDiscord, BrandStackoverflow } from "tabler-icons-react";
import { Avatar, Divider, Group, ActionIcon, Tooltip } from "@mantine/core";
import classes from "../../styles/Header.module.css";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { selectionStore } from "../../store/selectionStore";

interface ContactItem {
  label: string;
  url: string;
  icon: React.ReactElement;
}

export function Header() {
  const selected = useRecoilValue(selectionStore);

  const links: ContactItem[] = [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/muhammed-ali-can-45761a206/", icon: <BrandLinkedin /> },
    { label: "Github", url: "https://github.com/CanPacis/", icon: <BrandGithub /> },
    { label: "Discord", url: "https://discordapp.com/users/0944/", icon: <BrandDiscord /> },
    {
      label: "Stackoverflow",
      url: "https://stackoverflow.com/users/12360941/can-pacis/",
      icon: <BrandStackoverflow />,
    },
  ];

  return (
    <header className={classes.headerDesktop}>
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
      <Divider size="sm" color="blue" orientation="vertical" sx={{ margin: "auto", opacity: 0.4 }} />
      <Group sx={{ flexDirection: "column" }}>
        {links.map((link) => (
          <span key={link.url} data-capture-target={link.label} data-non-drag-target>
            <Link passHref target="_blank" href={link.url}>
              <ActionIcon color="blue" variant={selected.includes(link.label) ? "filled" : "light"} component="a">
                {link.icon}
              </ActionIcon>
            </Link>
          </span>
        ))}
      </Group>
      <Divider size="sm" color="blue" orientation="vertical" sx={{ margin: "auto", opacity: 0.4, height: 100 }} />
    </header>
  );
}
