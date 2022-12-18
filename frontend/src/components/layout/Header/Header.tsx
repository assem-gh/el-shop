import React, { Dispatch, SetStateAction } from "react";
import {
  ActionIcon,
  Box,
  Burger,
  Group,
  MediaQuery,
  TextInput,
} from "@mantine/core";
import { TbSearch } from "react-icons/tb";

import useStyles from "./header.style";
import { UserMenu } from "../../Menu/UserMenu";

interface HeaderProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ opened, setOpened }: HeaderProps) => {
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