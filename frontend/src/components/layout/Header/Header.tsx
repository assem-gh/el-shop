import React, { Dispatch, SetStateAction } from "react";
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Group,
  MediaQuery,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { TbMoonStars, TbSearch, TbSun } from "react-icons/tb";
import { FiBell } from "react-icons/fi";

import useStyles from "./header.style";
import { useKeycloak } from "@react-keycloak/web";
import { UserMenu } from "../../Menu/UserMenu";

interface HeaderProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ opened, setOpened }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const { keycloak } = useKeycloak();
  const { classes } = useStyles();

  return (
    <>
      <Box component="header" py="xs" className={classes.header}>
        <Group spacing="lg" className={classes.inner} noWrap>
          <Group>
            <Burger
              opened={opened}
              onClick={() => setOpened((prev) => !prev)}
            />
            <MediaQuery query="(max-width: 600px)" styles={{ display: "none" }}>
              <TextInput
                rightSection={
                  <ActionIcon>
                    <TbSearch size={16} />
                  </ActionIcon>
                }
                radius="sm"
                placeholder="Search ..."
              />
            </MediaQuery>
          </Group>

          <Group ml="auto">
            <Group ml={50} spacing={16}>
              <UserMenu />
            </Group>
          </Group>
        </Group>
      </Box>
      <Box h={72}></Box>
    </>
  );
};

export default Header;