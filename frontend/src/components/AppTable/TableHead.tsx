import React, { memo } from "react";
import useStyles from "./appTable.style";
import { Flex } from "@mantine/core";

interface TableHeadProps {
  fields: string[];
}

const TableHead = memo(({ fields }: TableHeadProps) => {
  const { classes } = useStyles();
  return (
    <thead>
      <tr>
        {fields.map((field) => (
          <th key={field} className={classes.tableHeader}>
            <Flex
              mih={50}
              gap="xs"
              justify="center"
              align="center"
              direction="column"
              wrap="nowrap"
            >
              {field}
            </Flex>
          </th>
        ))}
        <th className={classes.tableHeader}>
          <Flex
            mih={50}
            gap="xs"
            justify="center"
            align="center"
            direction="column"
            wrap="nowrap"
          >
            Actions
          </Flex>
        </th>
      </tr>
    </thead>
  );
});

export default TableHead;
