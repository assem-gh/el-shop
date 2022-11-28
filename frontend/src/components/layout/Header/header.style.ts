import { createStyles } from "@mantine/core";
import { getThemeColor } from "../../../utils";

const useStyles = createStyles((theme) => ({
  header: {
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderBottom: `1px solid ${getThemeColor(theme, 4, 2)}`,
    backgroundColor: getThemeColor(theme, 7),
    height: 72,
  },
  inner: {
    height: "100%",
  },
}));

export default useStyles;