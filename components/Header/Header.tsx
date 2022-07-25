import { BrandLinkedin, BrandGithub, BrandDiscord, BrandStackoverflow } from "tabler-icons-react";
import { Avatar, Divider, Group, ActionIcon, Tooltip } from "@mantine/core";
import classes from "../../styles/Header.module.css";
import Link from "next/link";

interface ContactItem {
  label: string;
  url: string;
  icon: React.ReactElement;
}

export function Header() {
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
        <Avatar radius={60} size={60} src="/profile-picture.png" alt="Profile picture" />
      </Group>
      <Divider size="sm" color="blue" orientation="vertical" sx={{ margin: "auto", opacity: 0.4 }} />
      <Group sx={{ flexDirection: "column" }}>
        {links.map((link) => (
          <span key={link.url} data-non-drag-target>
          <Link passHref target="_blank" href={link.url}>
            <ActionIcon component="a">{link.icon}</ActionIcon>
          </Link>
          </span>
        ))}
      </Group>
      <Divider size="sm" color="blue" orientation="vertical" sx={{ margin: "auto", opacity: 0.4, height: 100 }} />
    </header>
  );
}
