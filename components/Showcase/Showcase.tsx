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
  Timeline,
  Paper,
  RingProgress,
  SimpleGrid,
  createStyles,
  UnstyledButton,
} from "@mantine/core";
import { useListState, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useState } from "react";
import content, { Project, Tool } from "../../store/content";
import { TABLET_SIZE, MOBILE_SIZE, DESKTOP_SIZE } from "../../store/responsiveStore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
        {content.projects.map((project) => (
          <Carousel.Slide key={project.link}>
            <ProjectCard project={project} />
          </Carousel.Slide>
        ))}
      </Carousel>
    ),
    experiences: (
      <Timeline lineWidth={3} active={content.experiences.length - 1} bulletSize={20} sx={{ maxWidth: contentWidth }}>
        {content.experiences.map((experience, i) => (
          <Timeline.Item
            lineVariant={i === content.experiences.length - 2 ? "dashed" : "solid"}
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
          {content.languages
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
          {content.languages
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
    tools: <DndList data={content.tools} contentWidth={contentWidth} />,
    skills: <Skills contentWidth={contentWidth} />,
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
        size={isMobile ? "xs" : "lg"}
        value={tabValue}
        onChange={setTabValue}
        data={[
          { label: "Projects", value: "projects" },
          { label: "Experience", value: "experiences" },
          { label: "Languages", value: "languages" },
          { label: "Tools", value: "tools" },
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

const useToolsStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },
}));

export function DndList({ data, contentWidth }: { data: Tool[]; contentWidth: string }) {
  const { classes, cx } = useToolsStyles();
  const [state, handlers] = useListState(data);

  const items = state.map((item, index) => (
    <Draggable key={item.name} index={index} draggableId={item.logo}>
      {(provided, snapshot) => (
        <div
          data-non-drag-target
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* <Text className={classes.symbol}>{item.logo}</Text> */}
          <i className={`devicon-${item.logo}`}></i>
          <div>
            <Text>{item.name}</Text>
            <Text color="dimmed" size="sm">
              {item.description}
            </Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => handlers.reorder({ from: source.index, to: destination?.index || 0 })}
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <Group data-non-drag-target {...provided.droppableProps} sx={{ width: contentWidth, gap: 0, "& > *": { width: "100%" } }} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </Group>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const useSkillsStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
}));

export function Skills({ contentWidth }: { contentWidth: string }) {
  const { classes, theme } = useSkillsStyles();

  const items = content.skills.map((item) => (
    <UnstyledButton key={item.name} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size={10} mt={7}>
        {item.name}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card sx={{ width: contentWidth }} radius="md" className={classes.card}>
      <Group position="apart">
        <Text className={classes.title}>My Main Skills</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}
