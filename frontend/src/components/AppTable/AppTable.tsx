import React, { useCallback, useState } from "react";
import { Group, Pagination, Paper, Select, Table } from "@mantine/core";
import TableRow from "./TableRow";
import { tableData } from "../../data/tables";
import TableHead from "./TableHead";
import { RootState } from "../../store/store";
import useTablePagination from "../../hooks/usePagination";
import SelectColumn from "../Select/SelectColumn";

interface ListPageProps {
  entity: keyof RootState;
}

const AppTable = ({ entity }: ListPageProps) => {
  const defaultColumns = Object.keys(tableData[entity]);
  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleItemPerPageChange = useCallback(
    (value: string) => {
      setItemsPerPage(parseInt(value));
    },
    [setItemsPerPage]
  );

  const { totalPages, itemsToShow, handleChangePage, currentPage } =
    useTablePagination(entity, itemsPerPage);

  return (
    <Paper radius="md" shadow="md" p="md" withBorder>
      <Group my="md" position="right">
        <SelectColumn
          selectedColumns={selectedColumns}
          defaultColumns={defaultColumns}
          setSelectedColumns={setSelectedColumns}
        />
        <Select
          w="64px"
          data={["5", "10", "15", "20"]}
          value={`${itemsPerPage}`}
          onChange={handleItemPerPageChange}
        />
      </Group>

      <Table
        fontSize="md"
        striped
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <TableHead fields={selectedColumns} />
        <tbody>
          {itemsToShow.map((id) => (
            <TableRow
              entity={entity}
              key={id}
              id={id}
              selectedColumns={selectedColumns}
            />
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
