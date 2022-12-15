import { useState } from "react";
import {
  Avatar,
  createStyles,
  Divider,
  Group,
  Menu,
  Switch,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { TbLogout, TbMoonStars, TbSettings, TbTrash } from "react-icons/tb";

const useStyles = createStyles((theme) => ({
  userMenuBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const UserMenu = () => {
  const [, setUserMenuOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const userName = "Admin";

  const { classes } = useStyles();

  return (
    <Menu
      width={200}
      position="bottom-end"
      transition="pop-top-right"
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      closeOnItemClick={false}
    >
      <Menu.Target>
        <UnstyledButton className={classes.userMenuBtn}>
          <Group align="center" spacing={4}>
            <Avatar
              src={null}
              alt="user Avatar"
              color="cyan"
              radius="xl"
              size={32}
            >
              AD
            </Avatar>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{userName}</Menu.Label>
        <Divider />
        <Menu.Item icon={<TbSettings size={14} />}>Account settings</Menu.Item>
        <Menu.Item
          icon={<TbMoonStars size={14} />}
          rightSection={
            <Switch
              checked={colorScheme === "dark"}
              onChange={() => toggleColorScheme()}
              size="md"
            />
          }
        >
          Dark Theme
        </Menu.Item>

        <Menu.Item icon={<TbLogout size={14} />}>Logout</Menu.Item>

        <Divider />

        <Menu.Item color="red" icon={<TbTrash size={14} />}>
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
