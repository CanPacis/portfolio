import { Carousel } from "@mantine/carousel";
import { Badge, Button, Card, Group, SegmentedControl, Text, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { TABLET_SIZE, MOBILE_SIZE, DESKTOP_SIZE } from "../../store/responsiveStore";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  actionLabel: string;
}

const projects: Project[] = [
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
    link: "https://github.com/CanPacis/affixi",
    tags: ["Library", "TypeScript"],
    actionLabel: "See the repo",
  },
  {
    title: "Birlang",
    description: "Bir language where only one type exists.",
    image:
      "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
    link: "https://github.com/CanPacis/bir",
    tags: ["Experimental", "TypeScript"],
    actionLabel: "See the repo",
  },
  {
    title: "Birlang Go",
    description: "Bir language where only one type exists. But written in Go.",
    image:
      "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
    link: "https://github.com/CanPacis/birlang",
    tags: ["Experimental", "Go"],
    actionLabel: "See the repo",
  },
  {
    title: "Betic",
    description: "Another programming language attempt",
    image:
      "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
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
];

export function Showcase() {
  const isDesktop = useMediaQuery(DESKTOP_SIZE);
  const isTablet = useMediaQuery(TABLET_SIZE);
  const isMobile = useMediaQuery(MOBILE_SIZE);

  return (
    <Group
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
        data={[
          { label: "Projects", value: "projects" },
          { label: "Experience", value: "experience" },
          { label: "Languages", value: "languages" },
          { label: "Skills", value: "skills" },
        ]}
      />

      <Carousel
        data-non-drag-target
        sx={{ maxWidth: isMobile ? "100%" : isTablet ? "60%" : isDesktop ? "90%" : "60%" }}
        withControls={false}
        withIndicators
        height={600}
      >
        {projects.map((project) => (
          <Carousel.Slide key={project.link}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={project.image} height={280} alt={project.title} />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{project.title}</Text>
                <Group sx={(theme) => ({ gap: theme.spacing.xs })}>
                  {project.tags.map((tag) => (
                    <Badge key={tag} color="pink" variant="light">
                      {tag}
                    </Badge>
                  ))}
                </Group>
              </Group>

              <Text size="sm" color="dimmed">
                {project.description}
              </Text>

              <Link passHref href={project.link}>
                <Button component="a" variant="light" color="blue" fullWidth mt="md" radius="md">
                  {project.actionLabel}
                </Button>
              </Link>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Group>
  );
}
