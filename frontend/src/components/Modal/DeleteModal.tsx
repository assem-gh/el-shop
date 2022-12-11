import React, { Dispatch, SetStateAction, useCallback } from "react";
import { RootState } from "../../store/store";
import { deleteCategory, deleteProduct } from "../../store/api/productService";
import { AsyncThunk } from "@reduxjs/toolkit";
import { Button, Group, Stack, Text } from "@mantine/core";
import { useAppDispatch } from "../../store/hooks";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import BaseModal from "./BaseModal";
import { DeleteArg } from "../../store/api/types";

const mapEntities: Record<keyof RootState, AsyncThunk<void, DeleteArg, any>> = {
  product: deleteProduct,
  category: deleteCategory,
};

interface DeleteModalProps {
  id: string;
  entity: keyof RootState;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const DeleteModal = ({
  id,
  entity,
  openModal,
  setOpenModal,
}: DeleteModalProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(() => {
    dispatch(mapEntities[entity]({ id, entity }));
  }, [entity, id, dispatch]);
  
  const handleCancel = useCallback(() => setOpenModal(false), [setOpenModal]);

  return (
    <BaseModal openModal={openModal} setOpenModal={setOpenModal}>
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
        <Button variant="outline" color="gray" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="filled" onClick={handleDelete}>
          Delete
        </Button>
      </Group>
    </BaseModal>
  );
};

export default DeleteModal;
