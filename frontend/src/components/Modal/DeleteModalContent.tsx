import React from "react";
import { RootState } from "../../store/store";
import productService from "../../store/api/productService";
import { AsyncThunk } from "@reduxjs/toolkit";
import { Button, Group, Stack, Text } from "@mantine/core";
import { useAppDispatch } from "../../store/hooks";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const mapEntities: Record<keyof RootState, AsyncThunk<void, string, any>> = {
  product: productService.deleteProduct,
  category: productService.deleteCategory,
};

interface DeleteModalProps {
  onCancel: () => void;
  id: string;
  entity: keyof RootState;
}

const DeleteModalContent = ({ onCancel, id, entity }: DeleteModalProps) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(mapEntities[entity](id));
  };

  return (
    <>
      <Stack justify="center" align="center" spacing={0}>
        <MdOutlineReportGmailerrorred color="red" size={48} />
        <Text mb="md" weight="bold" size="lg" align="center">
          Are you sure?
        </Text>
      </Stack>

      <Text mb="lg">
        Do you really want to delete this {entity}? This process cannot be
        undone.
      </Text>
      <Group position="right">
        <Button variant="outline" color="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="filled" onClick={handleDelete}>
          Delete
        </Button>
      </Group>
    </>
  );
};

export default DeleteModalContent;
