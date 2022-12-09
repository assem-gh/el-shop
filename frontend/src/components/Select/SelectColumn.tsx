import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { Checkbox, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { TbChevronDown } from "react-icons/tb";
import { useStyles } from "./selectColumn.style";

interface SelectColumnProps {
  selectedColumns: string[];
  defaultColumns: string[];
  setSelectedColumns: Dispatch<SetStateAction<string[]>>;
}

const SelectColumn = ({
  selectedColumns,
  defaultColumns,
  setSelectedColumns,
}: SelectColumnProps) => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });

  const columnsDefaultIndexes = defaultColumns.reduce((acc, colName, i) => {
    return { ...acc, [colName]: i };
  }, {});

  const handleSelectField =
    (column: string) => (evt: ChangeEvent<HTMLInputElement>) => {
      const checked = evt.target.checked;
      const index =
        columnsDefaultIndexes[column as keyof typeof columnsDefaultIndexes];

      if (checked)
        setSelectedColumns((prev) => [
          ...prev.slice(0, index),
          column,
          ...prev.slice(index),
        ]);
      else
        setSelectedColumns((prev) => prev.filter((field) => field !== column));
    };

  const onOpen = useCallback(() => setOpened(true), [setOpened]);
  const onClose = useCallback(() => setOpened(false), [setOpened]);

  const items = defaultColumns.map((columnName) => (
    <Menu.Item
      key={columnName}
      closeMenuOnClick={false}
      rightSection={
        <Checkbox
          onChange={handleSelectField(columnName)}
          checked={selectedColumns.includes(columnName)}
        />
      }
    >
      {columnName}
    </Menu.Item>
  ));
  return (
    <Menu onOpen={onOpen} onClose={onClose} radius="sm" width="target">
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <Text>Display Columns</Text>
          </Group>
          <TbChevronDown size={16} className={classes.icon} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};

export default SelectColumn;
