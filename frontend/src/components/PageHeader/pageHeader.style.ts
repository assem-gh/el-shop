import { createStyles } from "@mantine/core";
import { getThemeColor } from "../../utils";

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.sm,
    marginBottom: theme.spacing.lg,
    height: 64,
    backgroundColor: getThemeColor(theme, 7),
  },
  inner: {
    height: "100%",
    alignItems: "center",
  },
}));

export default useStyles;
