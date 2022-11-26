import { ActionIcon, Button, createStyles, Group, Menu } from "@mantine/core";
import { TbChevronDown, TbTrash } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";

const useStyles = createStyles((theme) => ({
  button: {
    borderRadius: theme.radius.xl,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderRadius: theme.radius.xl,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

export function SplitButton() {
  const { classes, theme } = useStyles();
  const menuIconColor =
    theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6];

  return (
    <Group noWrap spacing={0}>
      <Button size="xs" className={classes.button}>
        Info
      </Button>
      <Menu transition="pop" position="bottom-end">
        <Menu.Target>
          <ActionIcon
            variant="filled"
            color={theme.primaryColor}
            size={30}
            className={classes.menuControl}
          >
            <TbChevronDown size={16} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<MdOutlineEdit size={16} color={menuIconColor} />}>
            Edit
          </Menu.Item>
          <Menu.Item icon={<TbTrash size={16} color={menuIconColor} />}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}