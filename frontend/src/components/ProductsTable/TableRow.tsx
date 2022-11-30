import React from "react";
import { useAppSelector } from "../../store/hooks";
import { selectProductById } from "../../store/slices/productSlice";
import { SplitButton } from "../Button/SplitButton";

interface ListItemProps {
  id: string;
}

const TableRow = ({ id }: ListItemProps) => {
  const data = useAppSelector((state) => selectProductById(state, id));
  if (!data) return null;

  return (
    <tr key={data.id}>
      <td>
        <img
          style={{ maxHeight: "72px" }}
          src={data.images[0]}
          alt="place-holder"
        />
      </td>
      <td>{data.title}</td>
      <td>{data.price}</td>
      <td>{data.category}</td>
      <td>
        <SplitButton />
      </td>
    </tr>
  );
};

export default TableRow;
