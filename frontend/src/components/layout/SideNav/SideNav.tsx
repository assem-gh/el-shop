import React, { useState } from "react";
import useStyles from "./sideNav.style";
import { Group, Navbar, Stack, Text, UnstyledButton } from "@mantine/core";
import { SiShopify } from "react-icons/si";
import NavLinksGroup from "../../NavLinksGroup/NavLinksGroup";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { navLinks } from "../../../data/navLinks";

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeGroup, setActiveGroup] = useState("products");

  const navGroups = navLinks.map((link) => (
    <NavLinksGroup
      key={link.name}
      setActiveGroup={setActiveGroup}
      isActive={activeGroup === link.name}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      {...link}
    />
  ));

  const { classes } = useStyles({ collapsed });

  return (
    <Navbar
      width={{ base: collapsed ? 72 : 220 }}
      sx={{ transition: "width 0.2s linear" }}
    >
      <Navbar.Section>
        <Group className={classes.header}>
          <SiShopify size={42} color="black" />
          <Text ml={-12} weight="bolder" size={24} className={classes.collapse}>
            El Shop
          </Text>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow py="md">
        <Stack spacing={0}>{navGroups}</Stack>
      </Navbar.Section>

      <Navbar.Section>
        <UnstyledButton
          className={classes.footer}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <Group position="left" px="xl">
            {collapsed ? <SlArrowRight /> : <SlArrowLeft />}
            <span className={classes.collapse}>collapse</span>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
};

export default SideNav;