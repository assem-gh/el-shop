import React, { Dispatch, SetStateAction } from "react";
import useStyles from "./sideNav.style";
import { Group, Navbar, Stack, Text } from "@mantine/core";
import { SiShopify } from "react-icons/si";
import NavLinksGroup from "../../NavLinksGroup/NavLinksGroup";
import { navLinks } from "../../../data/navLinks";

interface SideNavProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const SideNav = ({ opened, setOpened }: SideNavProps) => {
  const navGroups = navLinks.map((link) => (
    <NavLinksGroup
      key={link.name}
      collapsed={!opened}
      setOpened={setOpened}
      {...link}
    />
  ));

  const { classes, theme } = useStyles({ collapsed: !opened });

  return (
    <Navbar
      width={{ base: !opened ? 72 : 220 }}
      sx={{ transition: "width 0.2s linear" }}
    >
      <Navbar.Section>
        <Group className={classes.header}>
          <SiShopify size={42} color={theme.colors.green[6]} />
          <Text ml={-12} weight="bolder" size={24} className={classes.collapse}>
            El Shop
          </Text>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow py="md">
        <Stack spacing={0}>{navGroups}</Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default SideNav;