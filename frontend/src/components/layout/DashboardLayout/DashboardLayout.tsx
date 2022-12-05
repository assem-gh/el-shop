import { ReactNode, useState } from "react";
import { AppShell } from "@mantine/core";

import SideNav from "../SideNav/SideNav";
import Header from "../Header/Header";
import { getThemeColor } from "../../../utils";
import { useMediaQuery } from "@mantine/hooks";
import MobileNav from "../MobileNav/MobileNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [opened, setOpened] = useState(false);
  const matches = useMediaQuery("(min-width: 800px)");
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
      navbar={
        matches ? (
          <SideNav opened={opened} setOpened={setOpened} />
        ) : (
          <MobileNav handleClose={() => setOpened(false)} opened={opened} />
        )
      }
    >
      <Header opened={opened} setOpened={setOpened} />
      {children}
    </AppShell>
  );
};

export default DashboardLayout;
