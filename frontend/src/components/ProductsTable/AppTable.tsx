import React, { useState } from "react";
import useStyles from "./appTable.style";
import { Paper, Table } from "@mantine/core";
import TableRow from "./TableRow";
import { columns } from "../../data/tables";
import { useAppSelector } from "../../store/hooks";
import { selectProductsId } from "../../store/slices/productSlice";

interface ListPageProps {
  entity: "products" | "orders" | "users";
}

const AppTable = ({ entity }: ListPageProps) => {
  const { classes } = useStyles();
  const [fields] = useState<string[]>(columns[entity]);

  const ids = useAppSelector(selectProductsId) as string[];

  return (
    <Paper radius="md" shadow="md" p="md">
      <select>
        {fields.map((col) => (
          <option key={col} onChange={() => {}}>
            {col}
          </option>
        ))}
      </select>
      <Table fontSize="xs" striped highlightOnHover withColumnBorders>
        <thead>
          <tr>
            {fields.map((col) => (
              <th key={col} className={classes.tableHeader}>
                {col}
              </th>
            ))}
            <th className={classes.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ids.map((id) => (
            <TableRow key={id} id={id} />
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default AppTable;
