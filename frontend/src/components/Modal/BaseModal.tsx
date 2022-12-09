import React, { Dispatch, ReactNode, SetStateAction, useCallback } from "react";
import { Modal as MantineModal } from "@mantine/core";

interface ModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  withCloseBtn?: boolean;
  title?: string;
}

const BaseModal = ({
  openModal,
  setOpenModal,
  withCloseBtn = false,
  children,
  title = "",
}: ModalProps) => {
  const handleClose = useCallback(() => setOpenModal(false), [setOpenModal]);
  return (
    <MantineModal
      opened={Boolean(openModal)}
      onClose={handleClose}
      withCloseButton={withCloseBtn}
      title={title}
    >
      {children}
    </MantineModal>
  );
};

export default BaseModal;
