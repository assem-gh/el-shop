import React from "react";
import { useAppSelector } from "../../store/hooks";
import { selectProductById } from "../../store/slices/productSlice";
import { SplitButton } from "../Button/SplitButton";
import { Flex } from "@mantine/core";

interface ListItemProps {
  id: string;
  fields: string[];
}

const TableRow = ({ id, fields }: ListItemProps) => {
  const data = useAppSelector((state) => selectProductById(state, id));
  if (!data) return null;

  type ProductKey = keyof typeof data;
  const fieldMap: Record<string, ProductKey> = {
    Product: "images",
    Title: "title",
    Price: "price",
    Category: "category",
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
              {field === "Product" ? (
                <img
                  style={{ maxHeight: "72px" }}
                  src={data.images[0]}
                  alt="place-holder"
                />
              ) : (
                data[fieldMap[field]]
              )}
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
