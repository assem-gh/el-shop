import { createStyles } from "@mantine/core";
import { getThemeColor } from "../../../utils";

const useStyles = createStyles((theme) => ({
  header: {
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderBottom: `1px solid ${getThemeColor(theme, 4, 2)}`,
    backgroundColor: getThemeColor(theme, 7),
    paddingLeft: "calc(var(--mantine-navbar-width) + 12px)",
    height: 72,
    position: "fixed",
    right: 0,
    width: "100%",
    zIndex: 99,
    [theme.fn.smallerThan("sm")]: {
      padding: `${theme.spacing.md}px ${theme.spacing.md}px`,
    },
  },
  inner: {
    height: "100%",
  },
}));

export default useStyles;