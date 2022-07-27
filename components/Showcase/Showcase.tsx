import { Carousel } from "@mantine/carousel";
import { Badge, Divider, Button, Card, Group, SegmentedControl, Text, Image, Mark } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useState } from "react";
import { TABLET_SIZE, MOBILE_SIZE, DESKTOP_SIZE } from "../../store/responsiveStore";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  actionLabel: string;
}

interface Expreience {
  company: string;
  title: string;
  description: string;
  image: string;
  from: Date;
  to: Date | null;
}

interface Language {
  name: string;
  level: string;
  description: string;
  image: string;
}

interface Skill {
  name: string;
  level: string;
  description: string;
}

const tabs: { projects: Project[]; languages: Language[]; experiences: Expreience[] } = {
  projects: [
    {
      title: "Kâşif",
      description:
        "Kâşif; Turkish noun Explorer, A person who travels to places where few people have been before or places that are unknown to them, in order to find out more about them. Kâşif is a web based file explorer designed for every platform. If done, all major operating systems and web will be supported.",
      image: "/kasif.png",
      link: "https://github.com/Kasif-The-Explorer/kasif-the-explorer",
      tags: ["React", "Desktop App"],
      actionLabel: "See the repo",
    },
    {
      title: "Affixi",
      description: "A helper library for Turkish noun suffixes written in typescript.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      link: "https://canpacis.github.io/affixi/",
      tags: ["Library", "TypeScript"],
      actionLabel: "See the docs",
    },
    {
      title: "Birlang",
      description: "Bir language where only one type exists.",
      image:
        "/birlang.png",
      link: "https://github.com/CanPacis/bir",
      tags: ["Experimental", "TypeScript"],
      actionLabel: "See the repo",
    },
    {
      title: "Birlang Go",
      description: "Bir language where only one type exists. But written in Go.",
      image:
        "birlang-go.png",
      link: "https://github.com/CanPacis/birlang",
      tags: ["Experimental", "Go"],
      actionLabel: "See the repo",
    },
    {
      title: "Betic",
      description: "Another programming language attempt",
      image:
        "/betic.png",
      link: "https://github.com/CanPacis/betic",
      tags: ["Experimental", "TypeScript"],
      actionLabel: "See the repo",
    },
    {
      title: "Mantine",
      description:
        "A fully featured React components library. Build fully functional accessible web applications faster than ever - Mantine includes more than 100 customizable components and 40 hooks to cover you in any situation",
      image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/Hero.png",
      link: "https://mantine.dev",
      tags: ["Library", "Contribution"],
      actionLabel: "See the website",
    },
  ],

  experiences: [
    {
      company: "Various",
      title: "Freelance Developer",
      description: "",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2020, 0, 1),
      to: new Date(2021, 1, 1),
    },
    {
      company: "Viavis",
      title: "Frontend Developer",
      description: "",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2021, 1, 1),
      to: new Date(2022, 6, 1),
    },
    {
      company: "Macellan",
      title: "Senior Frontend Developer",
      description: "",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2022, 6, 1),
      to: null,
    },
  ],

  languages: [
    { name: "JavaScript", level: "Expert", description: "Expert", image: "/javascript.png" },
    { name: "TypeScript", level: "Expert", description: "Expert", image: "/typescript.png" },
    { name: "Go", level: "Experienced", description: "Expert", image: "/golang.webp" },
    { name: "Dart", level: "Beginner", description: "Expert", image: "/dart.png" },
    { name: "Turkish", level: "Native", description: "Native", image: "/turkey.jpg" },
    { name: "English", level: "Native", description: "Native", image: "/england.jpg" },
    { name: "French", level: "A1", description: "A1", image: "/france.jpg" },
    { name: "Swedish", level: "A1", description: "A1", image: "/sweden.webp" },
  ],
};

export function Showcase() {
  const isDesktop = useMediaQuery(DESKTOP_SIZE);
  const isTablet = useMediaQuery(TABLET_SIZE);
  const isMobile = useMediaQuery(MOBILE_SIZE);
  const [tabValue, setTabValue] = useState("projects");

  const formatDate = (date: Date | null): string => {
    if (!date) {
      return "Present";
    }

    return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
  };

  const views: { [key: string]: JSX.Element } = {
    projects: (
      <Carousel
        data-non-drag-target
        sx={{ maxWidth: isMobile ? "100%" : isTablet ? "60%" : isDesktop ? "90%" : "60%" }}
        styles={{ indicators: { bottom: 0 } }}
        withControls={false}
        withIndicators
        slideGap="xs"
      >
        {tabs.projects.map((project) => (
          <Carousel.Slide key={project.link}>
            <ProjectCard project={project} />
          </Carousel.Slide>
        ))}
      </Carousel>
    ),
    experiences: <div></div>,
    languages: <div></div>,
  };

  return (
    <Group
    mb="md"
      sx={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: isTablet ? "100vw" : "auto",
        padding: isTablet ? "4px 12px" : 0,
        maxWidth: isTablet ? "100vw" : "40vw",
      }}
    >
      <SegmentedControl
        data-non-drag-target
        size={isMobile ? "sm" : "lg"}
        value={tabValue}
        onChange={setTabValue}
        data={[
          { label: "Projects", value: "projects" },
          { label: "Experiences", value: "experiences" },
          { label: "Languages", value: "languages" },
          { label: "Skills", value: "skills" },
        ]}
      />

      {views[tabValue]}
    </Group>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card sx={{ cursor: "pointer" }} mb="md" shadow="sm" p="lg" radius="sm">
      <Card.Section inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>{project.title}</Text>
          <Group sx={(theme) => ({ gap: theme.spacing.xs })}>
            {project.tags.map((tag) => (
              <Badge styles={{ inner: { lineHeight: 13 } }} key={tag} color="pink" variant="light">
                {tag}
              </Badge>
            ))}
          </Group>
        </Group>
      </Card.Section>

      <Card.Section>
        <Divider />
      </Card.Section>

      <Text mt="sm" color="dimmed" size="sm">
        {project.description}
      </Text>

      <Card.Section mt="sm">
        <Image alt="project image" src={project.image} />
      </Card.Section>

      <Card.Section p="sm">
        <Link passHref href={project.link}>
          <Button component="a" variant="light" color="blue" fullWidth radius="md">
            {project.actionLabel}
          </Button>
        </Link>
      </Card.Section>
    </Card>
  );
}
