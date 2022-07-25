import { Carousel } from "@mantine/carousel";
import { Badge, Button, Card, Group, SegmentedControl, Text, Image } from "@mantine/core";

export function Showcase() {
  return (
    <Group sx={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
      <SegmentedControl
      data-non-drag-target
        size="lg"
        data={[
          { label: "Projects", value: "projects" },
          { label: "Experience", value: "experience" },
          { label: "Languages", value: "languages" },
          { label: "Skills", value: "skills" },
        ]}
      />

      <Carousel sx={{ maxWidth: "60%" }} mx="auto" withControls={false} withIndicators height={600}>
        <Carousel.Slide>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
              <Image src="/profile-picture.png" height={280} alt="Norway" />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Norway Fjord Adventures</Text>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and
              around the fjords of Norway. With Fjord Tours you can explore more of the magical fjord landscapes with
              tours and activities on and around the fjords of Norway. With Fjord Tours you can explore more of the
              magical fjord landscapes with tours and activities on and around the fjords of Norway.
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Book classic tour now
            </Button>
          </Card>
        </Carousel.Slide>
        <Carousel.Slide>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
              <Image src="/profile-picture.png" height={280} alt="Norway" />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Norway Fjord Adventures</Text>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and
              around the fjords of Norway. With Fjord Tours you can explore more of the magical fjord landscapes with
              tours and activities on and around the fjords of Norway. With Fjord Tours you can explore more of the
              magical fjord landscapes with tours and activities on and around the fjords of Norway.
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Book classic tour now
            </Button>
          </Card>
        </Carousel.Slide>
      </Carousel>
    </Group>
  );
}
