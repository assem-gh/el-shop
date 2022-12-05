import React from "react";
import useStyles from "./mobileNav.style";
import { Drawer, Group, Menu, SimpleGrid, Stack, Text } from "@mantine/core";
import { SiShopify } from "react-icons/si";
import { navLinks } from "../../../data/navLinks";
import NavLinksGroup from "../../NavLinksGroup/NavLinksGroup";
import Divider = Menu.Divider;

interface MobileNavProps {
  opened: boolean;
  handleClose: () => void;
}

const MobileNav = ({ opened, handleClose }: MobileNavProps) => {
  const navGroups = navLinks.map((link) => (
    <NavLinksGroup
      key={link.name}
      collapsed={false}
      setOpened={handleClose}
      {...link}
    />
  ));

  const { classes, theme } = useStyles();
  return (
    <Drawer
      classNames={{
        closeButton: classes.closeButton,
      }}
      opened={opened}
      onClose={handleClose}
      size="md"
    >
      <SimpleGrid cols={1}>
        <Group position="center" spacing={0}>
          <SiShopify size={48} color={theme.colors.green[6]} />
          <Text ml={12} weight="bolder" size={24}>
            El Shop
          </Text>
        </Group>
        <Divider />

        <Stack spacing={1}>{navGroups}</Stack>
      </SimpleGrid>
    </Drawer>
  );
};

export default MobileNav;
