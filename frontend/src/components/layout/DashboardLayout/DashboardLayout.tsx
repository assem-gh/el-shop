import { ReactNode } from "react";
import { AppShell } from "@mantine/core";

import SideNav from "../SideNav/SideNav";
import Header from "../Header/Header";

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
          backgroundColor: theme.colors.gray[0],
          paddingLeft: "calc(var(--mantine-navbar-width, 0px))",
          transition: "padding 0.2s linear",
        },
      })}
      navbar={<SideNav />}
    >
      <Header />
      {children}
    </AppShell>
  );
};

export default DashboardLayout;
