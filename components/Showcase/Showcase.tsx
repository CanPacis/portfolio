import { Carousel } from "@mantine/carousel";
import {
  Badge,
  Divider,
  Button,
  Card,
  Group,
  SegmentedControl,
  Text,
  Image,
  Mark,
  Timeline,
  Center,
  Paper,
  RingProgress,
  SimpleGrid,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useState } from "react";
import { GitBranch, GitCommit, GitPullRequest, MessageDots } from "tabler-icons-react";
import { TABLET_SIZE, MOBILE_SIZE, DESKTOP_SIZE } from "../../store/responsiveStore";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  actionLabel: string;
}

interface Experience {
  company: string;
  title: string;
  description: string;
  type: string;
  image: string;
  from: Date;
  to: Date | null;
}

interface Language {
  name: string;
  level: number;
  description: string;
  image: string;
  type: "programming" | "spoken";
  color: string;
}

interface Skill {
  name: string;
  level: string;
  description: string;
}

const tabs: { projects: Project[]; languages: Language[]; experiences: Experience[] } = {
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
      description:
        "A helper library for Turkish noun suffixes written in typescript. Because Turkish is an agglutinative language and vowel harmony is a challenge, Affixi approaches the problem in a functional way and provides the primitives to create appropriate suffixes. An extensive documentation is available on the GitHub repository.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      link: "https://canpacis.github.io/affixi/",
      tags: ["Library", "TypeScript"],
      actionLabel: "See the docs",
    },
    {
      title: "Birlang",
      description: "Bir language where only one type exists.",
      image: "/birlang.png",
      link: "https://github.com/CanPacis/bir",
      tags: ["Experimental", "TypeScript"],
      actionLabel: "See the repo",
    },
    {
      title: "Birlang Go",
      description: "Bir language where only one type exists. But written in Go.",
      image: "birlang-go.png",
      link: "https://github.com/CanPacis/birlang",
      tags: ["Experimental", "Go"],
      actionLabel: "See the repo",
    },
    {
      title: "Betic",
      description: "Another programming language attempt",
      image: "/betic.png",
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
      type: "Contracted",
      description: "I created small websites for small businesses and deployed them.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2020, 0, 1),
      to: new Date(2021, 1, 1),
    },
    {
      company: "Viavis",
      title: "Frontend Developer",
      type: "Full-time",
      description:
        "I built and refactored large webapp architectures, migrated from old technologies to new ones and built admin and power user tools for the company.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2021, 1, 1),
      to: new Date(2022, 6, 1),
    },
    {
      company: "Macellan",
      title: "Senior Frontend Developer",
      type: "Full-time",
      description:
        "I am building the company's main website and oversaw the development of the company's internal tools.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2022, 6, 1),
      to: null,
    },
  ],

  languages: [
    {
      color: "orange",
      type: "programming",
      name: "JavaScript",
      level: 6,
      description: "Expert",
      image: "/javascript.png",
    },
    {
      color: "orange",
      type: "programming",
      name: "TypeScript",
      level: 6,
      description: "Expert",
      image: "/typescript.png",
    },
    { color: "orange", type: "programming", name: "Go", level: 3, description: "Experienced", image: "/golang.webp" },
    { color: "orange", type: "programming", name: "Dart", level: 1, description: "Beginner", image: "/dart.png" },
    { color: "teal", type: "spoken", name: "Turkish", level: 6, description: "Native", image: "/turkey.jpg" },
    { color: "teal", type: "spoken", name: "English", level: 6, description: "C2", image: "/england.jpg" },
    { color: "teal", type: "spoken", name: "French", level: 1, description: "A1", image: "/france.jpg" },
    { color: "teal", type: "spoken", name: "Swedish", level: 1, description: "A1", image: "/sweden.webp" },
  ],
};

export function Showcase() {
  const isDesktop = useMediaQuery(DESKTOP_SIZE);
  const isTablet = useMediaQuery(TABLET_SIZE);
  const isMobile = useMediaQuery(MOBILE_SIZE);
  const [tabValue, setTabValue] = useState("projects");
  const contentWidth = isMobile ? "100%" : isTablet ? "60%" : isDesktop ? "90%" : "60%";

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
        sx={{ maxWidth: contentWidth }}
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
    experiences: (
      <Timeline lineWidth={3} active={tabs.experiences.length - 1} bulletSize={20} sx={{ maxWidth: contentWidth }}>
        {tabs.experiences.map((experience, i) => (
          <Timeline.Item
            lineVariant={i === tabs.experiences.length - 2 ? "dashed" : "solid"}
            key={experience.company}
            title={
              <>
                <Text size="lg" component="span">
                  {experience.title}
                </Text>{" "}
                <Text size="md" color="dimmed" component="span">
                  @ {experience.company}
                </Text>
              </>
            }
          >
            <Text color="dimmed" size="md">
              {experience.description}
            </Text>
            <Text size="sm" mt={4}>
              From{" "}
              <Text variant="link" component="span" inherit>
                {formatDate(experience.from)}
              </Text>{" "}
              to{" "}
              <Text variant="link" component="span" inherit>
                {formatDate(experience.to)}
              </Text>
            </Text>
            <Text color="dimmed" size="sm">
              {experience.type}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    ),
    languages: (
      <Group sx={{ flexDirection: "column" }}>
        <Text weight={500} color="dimmed">
          Programming Languages
        </Text>
        <SimpleGrid cols={2} sx={{ width: "100%" }}>
          {tabs.languages
            .filter((language) => language.type === "programming")
            .map((language) => (
              <StatsRing
                key={language.name}
                stat={{
                  label: language.description,
                  stats: language.name,
                  progress: language.level,
                  color: language.color,
                }}
              />
            ))}
        </SimpleGrid>
        <Text weight={500} color="dimmed">
          Spoken Languages
        </Text>
        <SimpleGrid cols={2} sx={{ width: "100%" }}>
          {tabs.languages
            .filter((language) => language.type === "spoken")
            .map((language) => (
              <StatsRing
                key={language.name}
                stat={{
                  label: language.description,
                  stats: language.name,
                  progress: language.level,
                  color: language.color,
                }}
              />
            ))}
        </SimpleGrid>
      </Group>
    ),
    skills: <div></div>,
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
          { label: "Experience", value: "experiences" },
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
    <Card sx={{ cursor: "pointer" }} mb="md" shadow="sm" p="lg" radius="md">
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

interface StatsRingProps {
  stat: {
    label: string;
    stats: string;
    progress: number;
    color: string;
    // icon: "up" | "down";
  };
}

export function StatsRing({ stat }: StatsRingProps) {
  return (
    <Paper radius="md" p="xs" key={stat.label}>
      <Group>
        <RingProgress
          size={80}
          roundCaps
          thickness={8}
          sections={[{ value: (100 * stat.progress) / 6, color: stat.color }]}
        />

        <div>
          <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
            {stat.label}
          </Text>
          <Text weight={700} size="xl">
            {stat.stats}
          </Text>
        </div>
      </Group>
    </Paper>
  );
}
