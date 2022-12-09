import { createStyles } from "@mantine/core";
import { getThemeColor } from "../../utils";

export const useStyles = createStyles(
  (theme, { opened }: { opened: boolean }) => {
    const bgLightColorScheme = opened ? theme.colors.gray[0] : theme.white;
    const bgDarkColorScheme = theme.colors.dark[opened ? 5 : 6];

    return {
      control: {
        width: 200,
        maxHeight: 36,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 15px",
        borderRadius: theme.radius.sm,
        border: `1px solid ${getThemeColor(theme, 4, 3)}`,
        transition: "background-color 150ms ease",
        backgroundColor:
          theme.colorScheme === "dark" ? bgDarkColorScheme : bgLightColorScheme,
        "&:hover": {
          backgroundColor: getThemeColor(theme, 5, 0),
        },
      },
      label: {
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,
      },
      icon: {
        transition: "transform 150ms ease",
        transform: opened ? "rotate(180deg)" : "rotate(0deg)",
      },
    };
  }
);
