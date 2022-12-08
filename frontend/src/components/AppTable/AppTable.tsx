import React, { ChangeEvent, useState } from "react";
import { Pagination, Paper, Table } from "@mantine/core";
import TableRow from "./TableRow";
import { tableData } from "../../data/tables";
import TableHead from "./TableHead";
import { RootState } from "../../store/store";
import useTablePagination from "../../hooks/usePagination";

interface ListPageProps {
  entity: keyof RootState;
}

const AppTable = ({ entity }: ListPageProps) => {
  const [fields, setFields] = useState(Object.keys(tableData[entity]));

  const { totalPages, itemsToShow, handleChangePage, currentPage } =
    useTablePagination({
      entity,
      itemsPerPage: 5,
    });

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
      <Table
        fontSize="md"
        striped
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <TableHead fields={fields} />
        <tbody>
          {itemsToShow.map((id) => (
            <TableRow entity={entity} key={id} id={id} fields={fields} />
          ))}
        </tbody>
      </Table>
      <Pagination
        position="center"
        mt="xl"
        mb="sm"
        page={currentPage}
        onChange={handleChangePage}
        total={totalPages}
        size="sm"
        withEdges
      />
    </Paper>
  );
};

export default AppTable;
