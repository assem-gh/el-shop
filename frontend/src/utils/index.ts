import { MantineTheme } from "@mantine/core";

export const getThemeColor = (
  theme: MantineTheme,
  dark?: number,
  gray?: number
) => {
  if (theme.colorScheme === "dark") {
    return typeof dark !== "undefined" ? theme.colors.dark[dark] : theme.black;
  }
  return typeof gray !== "undefined" ? theme.colors.gray[gray] : theme.white;
};
