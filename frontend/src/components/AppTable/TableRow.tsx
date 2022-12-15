import React from "react";
import { useAppSelector } from "../../store/hooks";
import { selectProductById } from "../../store/slices/productSlice";
import { SplitButton } from "../Button/SplitButton";
import { Flex, Image, Spoiler } from "@mantine/core";
import { RootState } from "../../store/store";
import { selectCategoryById } from "../../store/slices/categorySlice";
import { tableData } from "../../data/tables";

interface ListItemProps {
  id: string;
  selectedColumns: string[];
  entity: keyof RootState;
  search: string;
}

const selectData = {
  product: selectProductById,
  category: selectCategoryById,
};

const TableRow = ({ id, selectedColumns, entity, search }: ListItemProps) => {
  const data = useAppSelector((state) => selectData[entity](state, id));
  const query = search.toLowerCase().trim();

  if (!data) return null;
  const matchQuery = Object.values(data).some(
    (value) => typeof value === "string" && value.toLowerCase().includes(query)
  );
  console.log(matchQuery);
  console.log(query);
  if (!matchQuery) return null;

  type ItemKey = keyof typeof data;
  const mapFieldToKey = tableData[entity];

  const cellData = (colName: string) => {
    if (colName === "Category") {
      // @ts-ignore
      return data["category"]["name"];
    }
    if (colName === "Description") {
      return (
        <Spoiler maxHeight={55} showLabel=" more" hideLabel="Hide">
          {/*@ts-ignore*/}
          {data["description"]}
        </Spoiler>
      );
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
      {selectedColumns.map((columnName) => {
        return (
          <td key={columnName}>
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
