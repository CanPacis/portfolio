import { createStyles, Text, Group, Select } from "@mantine/core";
import { useRecoilState } from "recoil";
import { languageState } from "../../store/content";

const useStyles = createStyles((theme) => ({
  footer: {
    height: 60,
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
  },

  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
}));

export function Footer() {
  const { classes } = useStyles();
  const [language, setLanguage] = useRecoilState(languageState);

  return (
    <div className={classes.footer}>
      <Group px={10} align="center" sx={{ height: "100%", justifyContent: "space-between" }}>
        <Select
          data-non-drag-target
          value={language}
          onChange={(value) => setLanguage(value || "en-US")}
          placeholder="Language"
          data={[
            { value: "en-US", label: "English" },
            { value: "tr", label: "Turkish" },
          ]}
          sx={{ maxWidth: 140 }}
        />
        <Text size="xs" color="dimmed">
          Muhammed Ali CAN - 2022
        </Text>
      </Group>
    </div>
  );
}
