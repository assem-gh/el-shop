import { createStyles } from "@mantine/core";
import { getThemeColor } from "../../../utils";

const useStyles = createStyles((theme, params: { collapsed: boolean }) => ({
  collapse: {
    position: "absolute",
    left: params.collapsed ? -24 : 84,
    opacity: params.collapsed ? 0 : 1,
    transition: "all 0.3s ease",
  },
  header: {
    height: 72,
    width: "100%",
    justifyContent: params.collapsed ? "center" : "flex-start",
    alignItems: "center",
    borderBottom: `1px solid ${getThemeColor(theme, 4, 2)}`,
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
  },
  nav: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  links: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  footer: {
    width: "100%",
    height: "56px",
  },
}));

export default useStyles;