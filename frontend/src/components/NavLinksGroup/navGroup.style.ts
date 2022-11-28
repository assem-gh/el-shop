import { createStyles } from "@mantine/core";
import { getThemeColor } from "../../utils";

const useStyles = createStyles(
  (theme, params: { collapsed: boolean; isActive: boolean }) => ({
    flex: {
      display: "flex",
      justifyContent: params.collapsed ? "center" : "flex-start",
      alignItems: "center",
    },
    itemControl: {
      width: "100%",
      height: "48px",
      fontWeight: params.isActive ? 900 : 400,
      position: "relative",
      gap: 16,
      backgroundColor: getThemeColor(theme, 7),
      color: params.isActive
        ? theme.colors.blue[6]
        : getThemeColor(theme, 0, 8),
      "&:hover": {
        backgroundColor: theme.fn.rgba(
          theme.colors[theme.primaryColor][6],
          0.2
        ),
      },
    },
    label: {
      position: "absolute",
      left: params.collapsed ? -24 : 64,
      opacity: params.collapsed ? 0 : 1,
      transition: "all 0.3s ease",
    },
    leftIcon: {
      marginLeft: params.collapsed ? 0 : theme.spacing.md,
    },
    rightIcon: {
      position: "absolute",
      right: params.collapsed ? -36 : 12,
      opacity: params.collapsed ? 0 : 1,
      transition: "all 0.3s ease",
      rotate: params.isActive ? "0deg" : "-90deg",
    },
    navItem: {
      height: "24px",
      gap: 4,

      paddingLeft: params.collapsed ? 0 : "25%",
      "&:hover": {
        backgroundColor: theme.fn.rgba(
          theme.colors[theme.primaryColor][6],
          0.2
        ),
      },
    },
  })
);

export default useStyles;
