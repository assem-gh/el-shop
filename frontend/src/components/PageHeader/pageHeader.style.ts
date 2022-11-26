import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
    marginBottom: theme.spacing.lg,
    height: 64,
    backgroundColor: theme.white,
    borderBottom: "1px solid" + theme.colors.gray[2],
  },
  inner: {
    height: "100%",
    alignItems: "center",
  },
}));

export default useStyles;
