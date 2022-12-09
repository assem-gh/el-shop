import React, { Dispatch, SetStateAction } from "react";
import { Modal as MantineModal } from "@mantine/core";
import { RootState } from "../../store/store";
import DeleteModalContent from "./DeleteModalContent";

interface ModalProps {
  openModal: "Edit" | "Delete" | "";
  setOpenModal: Dispatch<SetStateAction<"Edit" | "Delete" | "">>;

  id: string;
  entity: keyof RootState;
}

const Modal = ({ openModal, setOpenModal, id, entity }: ModalProps) => {
  const isDelete = openModal === "Delete";
  const isEdit = openModal === "Edit";

  const onCancel = () => {
    setOpenModal("");
  };

  return (
    <MantineModal
      size={isDelete ? "md" : "lg"}
      opened={Boolean(openModal)}
      onClose={() => setOpenModal("")}
      withCloseButton={false}
    >
      {isDelete && (
        <DeleteModalContent onCancel={onCancel} id={id} entity={entity} />
      )}
      {isEdit && <div> Edit modal content </div>}
    </MantineModal>
  );
};

export default Modal;
