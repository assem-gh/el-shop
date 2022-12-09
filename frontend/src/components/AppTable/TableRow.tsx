import React from "react";
import { useAppSelector } from "../../store/hooks";
import { selectProductById } from "../../store/slices/productSlice";
import { SplitButton } from "../Button/SplitButton";
import { Flex, Image } from "@mantine/core";
import { RootState } from "../../store/store";
import { selectCategoryById } from "../../store/slices/categoryslice";
import { tableData } from "../../data/tables";

interface ListItemProps {
  id: string;
  selectedColumns: string[];
  entity: keyof RootState;
}

const selectData = {
  product: selectProductById,
  category: selectCategoryById,
};

const TableRow = ({ id, selectedColumns, entity }: ListItemProps) => {
  const data = useAppSelector((state) => selectData[entity](state, id));
  if (!data) return null;
  type ItemKey = keyof typeof data;
  const mapFieldToKey = tableData[entity];

  const cellData = (colName: string) => {
    if (colName === "Category") {
      // @ts-ignore
      return data["category"]["name"];
    }
    if (colName === "Product") {
      return (
        <Image
          width={200}
          height={80}
          fit="contain"
          // @ts-ignore
          src={data["images"][0]}
          alt="Product"
        />
      );
    }
    const accessor = mapFieldToKey[colName] as ItemKey;
    if (accessor) return data[accessor];
  };

  return (
    <tr className="row" key={data.id}>
      {selectedColumns.map((columnName, i) => {
        return (
          <td key={columnName + i}>
            <Flex
              mih={50}
              gap="xs"
              justify="center"
              align="center"
              direction="column"
              wrap="nowrap"
            >
              {cellData(columnName)}
            </Flex>
          </td>
        );
      })}
      <td>
        <Flex
          mih={50}
          gap="xs"
          justify="center"
          align="center"
          direction="column"
          wrap="nowrap"
        >
          <SplitButton id={id} entity={entity} />
        </Flex>
      </td>
    </tr>
  );
};

export default TableRow;
