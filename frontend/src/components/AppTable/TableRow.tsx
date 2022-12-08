import React from "react";
import { useAppSelector } from "../../store/hooks";
import { selectProductById } from "../../store/slices/productSlice";
import { SplitButton } from "../Button/SplitButton";
import { Flex } from "@mantine/core";
import { RootState } from "../../store/store";
import { selectCategoryById } from "../../store/slices/categoryslice";
import { tableData } from "../../data/tables";

interface ListItemProps {
  id: string;
  fields: string[];
  entity: keyof RootState;
}

const selectData = {
  product: selectProductById,
  category: selectCategoryById,
};

const TableRow = ({ id, fields, entity }: ListItemProps) => {
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
      // @ts-ignore
      return <img src={data["images"][0]} alt="Product" />;
    }
    const accessor = mapFieldToKey[colName] as ItemKey;
    if (accessor) return data[accessor];
  };

  return (
    <tr className="row" key={data.id}>
      {fields.map((field, i) => {
        return (
          <td key={field + i}>
            <Flex
              mih={50}
              gap="xs"
              justify="center"
              align="center"
              direction="column"
              wrap="nowrap"
            >
              {cellData(field)}
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
          <SplitButton />
        </Flex>
      </td>
    </tr>
  );
};

export default TableRow;
