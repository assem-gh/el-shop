import { ReactNode } from "react";
import { AppShell, Box } from "@mantine/core";

import SideNav from "../SideNav/SideNav";
import Header from "../Header/Header";
import { getThemeColor } from "../../../utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <AppShell
      styles={(theme) => ({
        body: { minHeight: "100vh" },
        main: {
          paddingTop: 0,
          paddingRight: 0,
          backgroundColor: getThemeColor(theme, 8, 1),
          paddingLeft: "calc(var(--mantine-navbar-width, 0px))",
          transition: "padding 0.2s linear",
        },
      })}
      navbar={<SideNav />}
    >
      <Header />
      <Box p="lg">{children}</Box>
    </AppShell>
  );
};

export default DashboardLayout;
