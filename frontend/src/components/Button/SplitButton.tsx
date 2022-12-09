import { ActionIcon, Button, Group, Menu } from "@mantine/core";
import { TbChevronDown, TbTrash } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";
import { useStyles } from "./splitButton.style";
import { useCallback, useState } from "react";
import { RootState } from "../../store/store";
import DeleteModal from "../Modal/DeleteModal";

interface SplitButtonProps {
  entity: keyof RootState;
  id: string;
}

export function SplitButton({ entity, id }: SplitButtonProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { classes, theme } = useStyles();
  const menuIconColor =
    theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6];

  const handleDeleteItem = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

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
          <Menu.Item
            onClick={handleDeleteItem}
            icon={<TbTrash size={16} color={menuIconColor} />}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        id={id}
        entity={entity}
      />
    </Group>
  );
}
