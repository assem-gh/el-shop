import React, { ChangeEvent, useState } from "react";
import useStyles from "./appTable.style";
import { Paper, Table } from "@mantine/core";
import TableRow from "./TableRow";
import { columns } from "../../data/tables";
import { useAppSelector } from "../../store/hooks";
import { selectProductsId } from "../../store/slices/productSlice";
import TableHead from "./TableHead";

interface ListPageProps {
  entity: "products" | "orders" | "users";
}

const AppTable = ({ entity }: ListPageProps) => {
  const [fields, setFields] = useState(columns[entity]);

  const ids = useAppSelector(selectProductsId) as string[];
  const { classes } = useStyles();

  const handleSelectField = (evt: ChangeEvent<HTMLSelectElement>) => {};

  return (
    <Paper radius="md" shadow="md" p="md" withBorder>
      <select onChange={handleSelectField}>
        {fields.map((field) => (
          <option key={field} onChange={() => {}}>
            {field}
          </option>
        ))}
      </select>
      <Table fontSize="md" striped highlightOnHover withColumnBorders>
        <TableHead fields={fields} />
        <tbody>
          {ids.map((id) => (
            <TableRow key={id} id={id} fields={fields} />
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default AppTable;
